import { createSlice } from '@reduxjs/toolkit';

// Extension de l'état initial pour inclure tripName
const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    tripId: null,
    tripName: null, // Ajout du tripName à l'état initial
    trips: [],
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action pour gérer la connexion de l'utilisateur
    login: (state, action) => {
      const { token, username, email } = action.payload;
      state.value = { ...state.value, token, username, email }; // Utilisation de la déstructuration pour une mise à jour propre
      state.isLoggedIn = true;
    },
    // Action pour gérer la déconnexion de l'utilisateur
    logout: (state) => {
      state.value = { ...state.value, token: null, username: null, email: null, tripId: null, tripName: null }; // Réinitialisation complète lors de la déconnexion
      state.isLoggedIn = false;
    },
    // Reducer pour définir trip
    setTrips: (state, action) => {
      state.value.trips = action.payload;
  },
    // Reducer pour définir tripName
    setTripName: (state, action) => {
      state.value.tripName = action.payload;
    },
    
  },
});

// Exportation des actions du slice
export const { login, logout, setTripId, setTripName, setTrips } = userSlice.actions;

// Exportation du reducer
export default userSlice.reducer;
