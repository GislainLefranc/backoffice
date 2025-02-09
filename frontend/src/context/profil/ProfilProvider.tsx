import React, { useEffect, useState } from "react";
import { getDatasById } from "../../services/api";
import { User } from "../../types/user.type";
import { ProfilContext } from "./ProfilContext";

interface ProfilProviderProps {
  children: React.ReactNode;
}

export const ProfilProvider = ({ children }: ProfilProviderProps) => {
  const [profil, setProfil] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const data = await getDatasById("/users", 1);
        setProfil(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil", error);
      }
    };
    fetchProfil();
  }, []);

  return (
    <ProfilContext.Provider value={{ profil, setProfil }}>
      {children}
    </ProfilContext.Provider>
  );
};
