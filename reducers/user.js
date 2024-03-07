import { createSlice } from '@reduxjs/toolkit';
// Définition de l'état initial de l'utilisateur
const initialState = {
  value: { token: null, username: null, email: null },
  isLoggedIn: false, 
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action pour gérer la connexion de l'utilisateur
    login: (state, action) => {
      const { token, username, email } = action.payload;
      state.value = { token, username, email }; // Mise à jour de l'état avec les informations de l'utilisateur
      state.isLoggedIn = true;
    },
    // Action pour gérer la déconnexion de l'utilisateur
    logout: (state) => {
      state.value = { token: null, username: null, email: null }; // Assurez-vous de réinitialiser également l'email si nécessaire
      state.isLoggedIn = false;
    },
  },
});

// Exportation des actions du slice
export const { login, logout } = userSlice.actions;

// Exportation du reducer
export default userSlice.reducer;
