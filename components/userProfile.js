import React, { useState, useEffect } from 'react';
import Modal from './Modal'; 
import styles from'../styles/userProfile.module.css'; 
import { useSelector } from 'react-redux';

const UserProfile = ({ username }) => {
const [profilePicture, setProfilePicture] = useState('');
const [trips, setTrips] = useState([]);
const [showModal, setShowModal] = useState(false);

// Récupére le token du state Redux
const token = useSelector(state => state.user.value.token);

useEffect(() => {
    const fetchTrips = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/trips/myTrips', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            // Gère les réponses d'erreur, par exemple en affichant une notification
            // ou en redirigeant l'utilisateur
            throw new Error('Failed to fetch trips');
          }
          // Si la réponse est positive, extrait les données JSON
          const data = await response.json();
          // Utilise les données, par exemple en mettant à jour l'état local avec les voyages récupérés
          setTrips(data.trips);
          setProfilePicture(data.userPicture);
        } catch (error) {
          console.error(error);
          // Gère l'erreur, par exemple en définissant un état d'erreur ou en affichant un message
        }
      }
    };
  
    fetchTrips();
  }, [token]);
  

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      // Utilisez la clé 'userPicture' pour ajouter le fichier à formData
      formData.append('userPicture', file);
      
      try {
        const response = await fetch('http://localhost:3000/users/profilePicture', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            // Note: Vous n'avez pas besoin d'ajouter 'Content-Type': 'multipart/form-data' ici,
            // fetch le fait automatiquement quand vous passez un objet FormData.
          },
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to update profile picture');
        const data = await response.json();
        setProfilePicture(data.updatedPicture); // Assurez-vous que c'est le bon champ retourné par votre API
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  // Suppression d'un voyage
  const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete the trip');
      setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error(error);
    }
    
  };
  const handleNewTripClick = () => {
    if (!isLoggedIn) {
      setIsModalVisible(true);
    } else {
      router.push('/addTrip'); 
    }
  };

  return (
    <div>
    <div className={styles.container}>
      <img src={profilePicture} alt={`${username} Profile`} className={styles.picture} />
      <button className={styles.change} onClick={() => setShowModal(true)}>changer la photo</button>
      <Modal className={styles.modal}isOpen={showModal} onClose={() => setShowModal(false)}>
        <input type="file" onChange={handleProfilePictureChange} />
      </Modal> 
      <h2 className={styles.mytravel}>Mes voyages</h2>
    </div>
    <div className={styles.tripsContainer}>
      {trips.map((trip, index) => (
        <div key={index} className={styles.tripInfo}>
          <span>{trip.name}</span>
          <button className={styles.go}onClick={() => console.log(`Going to dashboard for ${trip.id}`)}>Go</button>
          {trip.isAdmin && <button className={styles.delete} onClick={() => deleteTrip(trip.id)}>Supprimer</button>}
        </div>
      ))}
       <button onClick={handleNewTripClick}className={styles.trip}>Nouveau voyage</button>
    </div>
  </div>
  
  );
};

export default UserProfile;
