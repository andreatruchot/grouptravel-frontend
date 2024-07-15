import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invitations: [],
};

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    // Ajoute ou met à jour l'invitation dans le tableau d'invitations
    updateInvitationStatus: (state, action) => {
      const { _id, status } = action.payload;
      const index = state.invitations.findIndex(invite => invite._id === _id);
      if (index !== -1) {
        state.invitations[index].status = status;
      } else {
        // Si l'invitation n'est pas trouvée, on peut choisir de l'ajouter ou simplement ignorer
        state.invitations.push(action.payload);
      }
    },
  },
});

export const { updateInvitationStatus } = invitationSlice.actions;

export default invitationSlice.reducer;
