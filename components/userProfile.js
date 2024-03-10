import React, { useState, useEffect } from 'react';
import Modal from './Modal'; 
import styles from'../styles/userProfile.module.css'; 
import { useSelector, useDispatch, } from 'react-redux';
import { useRouter } from 'next/router';
import { setTripId  } from '../reducers/user';
import { setTripName } from '../reducers/user'


const UserProfile = ({ username }) => {


const [profilePicture, setProfilePicture] = useState('');
const [trips, setTrips] = useState([]);
const [showModal, setShowModal] = useState(false);
const isLoggedIn = useSelector(state => state.user.isLoggedIn);
const router = useRouter();
const dispatch = useDispatch();

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
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();
         // Mise à jour l'état global avec les voyages récupérés
         dispatch(setTrips(data.trips));
         setProfilePicture(data.userPicture);
      } catch (error) {
        console.error(error);
      }
    }
  };

  fetchTrips();
}, [dispatch]);

const handleGoToDashboard = (tripName) => {
  // Stockage du nom du voyage sélectionné dans le store Redux
  dispatch(setTripName(tripName));// cette action met à jour l'état Redux correctement.
  // Navigation simple vers la page de tableau de bord
  router.push('/dashboard');
};

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
        <button className={styles.change} onClick={() => setShowModal(true)}>Changer la photo</button>
        <Modal className={styles.modal} isOpen={showModal} onClose={() => setShowModal(false)}>
          <input type="file" onChange={handleProfilePictureChange} />
        </Modal>
        <h2 className={styles.mytravel}>Mes voyages</h2>
      </div>
      <div className={styles.tripsContainer}>
        {trips.map((trip, index) => (
          <div key={index} className={styles.tripInfo}>
            <span>{trip.name}</span>
            {/* Utilisez trip.name pour la navigation et les actions */}
            <button className={styles.go} onClick={() => handleGoToDashboard(trip.name)}>Go</button>
            <button className={styles.delete} onClick={() => handleDeleteTrip(trip.name)}>Supprimer</button>
          </div>
        ))}
        <button onClick={handleNewTripClick} className={styles.trip}>Nouveau voyage</button>
      </div>
    </div>
  );
 }
  
export default UserProfile;
