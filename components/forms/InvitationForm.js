import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrips } from '../../reducers/user';
import { setSelectedTripId } from '../../reducers/user';
import styles from '../../styles/InvitationForm.module.css';


const InvitationForm = () => {
  const dispatch = useDispatch();
  const { selectedTripId, token } = useSelector(state => state.user.value);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInvite = async (event) => {
    event.preventDefault();
    const invitationData = {
      email,
      tripId: selectedTripId, 
    };

    try {
      const response = await fetch(`http://localhost:3000/invitations/send-invitation`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json', 
             'Authorization': `Bearer ${token}`,
     },
          body: JSON.stringify(invitationData),
     });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage('Invitation envoyée avec succès.');
      setErrorMessage('');
       dispatch(setTrips(data.trips));
    } catch (error) {
      setErrorMessage(`Erreur lors de l'envoi de l'invitation : ${error.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div>
     <form className={styles.form}
          type="email"onSubmit={handleInvite}>
      <h2 className={styles.title}>Invitez vos amis à participer</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          placeholder='Entrez un email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.btn} type="submit">Envoyer l'invitation</button>
        <img src="../images/stickers/sacados.png" alt='stickers sac à dos ' className={styles.stickers}></img>
      </form>
    </div>
  );
};

export default InvitationForm;
