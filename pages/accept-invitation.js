import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {updateInvitationStatus}  from '../reducers/invitation';

const email = useSelector((state) => state.user.value.email);
const token = useSelector((state) => state.user.value.token); // Cette variable doit être utilisée dans la requête fetch
const selectedTripId = useSelector((state) => state.user.value.selectedTripId);


const AcceptInvitationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const email = useSelector((state) => state.user.value.email);
  const token = useSelector((state) => state.user.value.token);
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);

  
  const handleAcceptInvitation = async () => {
    try {
      const response = await fetch('https://grouptravel-backend.vercel.app/accept-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, tripId: selectedTripId }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to accept invitation. Server responded with ${response.status}: ${errorText}`);
      }
  
      const data = await response.json(); // Suppose this contains the updated invitation data
  
      // Dispatcherl'action pour mettre à jour le statut de l'invitation
      dispatch(updateInvitationStatus({
        _id: data._id, 
        status: data.status 
      }));
  
      // Redirection ou autre logique de gestion après l'acceptation
      router.push('/dashboard');
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };
  return (
  <div>
    <button onClick={handleAcceptInvitation}>Accepter l'Invitation</button>
  </div>
);
  } 
export default AcceptInvitationPage;
