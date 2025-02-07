const API_URL = import.meta.env.VITE_API_URL;

// Fonction générique pour les requêtes API sans authentification
const fetchApi = async (endpoint: string, options: RequestInit) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    throw error;
  }
};

// Récupérer des données (GET)
export const getDatas = async (endpoint: string) => {
  return fetchApi(endpoint, { method: "GET" });
};

// Récupérer des données par ID (GET)
export const getDatasById = async (endpoint: string, id: number | string) => {
  return fetchApi(`${endpoint}/${id}`, { method: "GET" });
};

// Créer des données (POST)
export const createDatas = async <T, D>(
  endpoint: string,
  data: D
): Promise<T> => {
  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Créer des données avec un fichier ou un commentaire (POST)
export const createDatasFileOrComment = async <T, D>(
  endpoint: string,
  id: number | string,
  mediaOrComments: string,
  data: D
): Promise<T> => {
  return fetchApi(`${endpoint}/${id}/${mediaOrComments}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Mettre à jour des données (PUT)
export const updateDatas = async <T, D>(
  endpoint: string,
  id: number | string,
  data: D
): Promise<T> => {
  console.log("Données envoyées après modification :", data);
  try {
    const response = await fetchApi(`${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    console.log("Réponse du serveur :", response);
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

// Supprimer des données (DELETE)
export const deleteDatas = async (endpoint: string, id: number | string) => {
  return fetchApi(`${endpoint}/${id}`, { method: "DELETE" });
};

// Supprimer des données avec un fichier ou un commentaire (DELETE)
export const deleteDatasFileOrComment = async (
  endpoint: string,
  id: number | string,
  mediaOrComments: string,
  mediaId: number | string
) => {
  return fetchApi(`${endpoint}/${id}/${mediaOrComments}/${mediaId}`, {
    method: "DELETE",
  });
};

export default fetchApi;
