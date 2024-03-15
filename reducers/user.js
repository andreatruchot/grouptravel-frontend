import { createSlice } from '@reduxjs/toolkit';

// Extension de l'état initial pour inclure tripName
const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    selectedTripId: null,
    trips: [],
    tripDetails: {},
    isLoggedIn: false,
    imagePreviewUrl: '',
   
  },
 
};

export const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
      // Action pour gérer la connexion de l'utilisateur
    login: (state, action) => {
       const { token, username, email } = action.payload;
       state.value = { ...state.value, token, username, email }; // Utilisation de la déstructuration pour une mise à jour propre
       state.value.isLoggedIn = true;
      },

    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Action pour gérer la déconnexion de l'utilisateur
    logout: (state) => {
      state.value = { ...state.value, token: null, username: null, email: null, setSelectedTripId: null,}; // Réinitialisation complète lors de la déconnexion
      state.value.isLoggedIn = false;
    },
  
    setSelectedTripId: (state, action) => {
      state.value.selectedTripId = action.payload;
    },
    
    setTrips: (state, action) => {
      console.log("action.payload", action.payload)
      state.value.trips = action.payload; // Mettre à jour les voyages dans l'état
    },
    updateTrips: (state, action) => {
      // Cette action est utilisée pour mettre à jour la liste des voyages avec de nouvelles données
      state.value.trips = action.payload;
    },
    setTripDetails: (state, action) => {
      // Mettre à jour l'état avec les détails d'un voyage spécifique
      state.value.tripDetails = action.payload;
    },
    addActivity: (state, action) => {
      // Cette action sera utilisée pour mettre à jour l'état avec les détails rafraîchis du voyage
     
      state.value.tripDetails.activities.push(action.payload);
    },
    addAccomodation: (state, action) => {
      // Cette action sera utilisée pour mettre à jour l'état avec les détails rafraîchis du voyage
     
      state.value.tripDetails.accomodations.push(action.payload);
    },
    setImagePreviewUrl: (state, action) => {
      state.imagePreviewUrl = action.payload;
    },
    
  },
});

// Exportation des actions du slice
export const { login, logout, setSelectedTripId, setTrips,  setToken, updateTrips, setTripDetails, addActivity, addAccomodation, setImagePreviewUrl } = userSlice.actions;

// Exportation du reducer
export default userSlice.reducer;
