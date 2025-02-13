import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContext";
import { User } from "../../types/user.type";
const API_URL = import.meta.env.VITE_API_URL;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifie l'authentification au chargement
  const checkAuth = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Rafraîchir le token si nécessaire
        const refreshAuthToken = async () => {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            logout();
            return;
          }
        }; // Tente un rafraîchissement du token
        await refreshAuthToken();
        return;
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Erreur lors de la vérification du token", error);
      logout(); // Déconnecte seulement si auth/me et refreshToken échouent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Connexion de l'utilisateur
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const { token, refreshToken, user } = data;

      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      throw new Error("Erreur lors de la connexion");
    }
  };

  // Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
