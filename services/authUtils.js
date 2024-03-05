

// Fonction pour stocker le token d'authentification dans le localStorage
export const storeAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Fonction pour récupérer le token d'authentification du localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };