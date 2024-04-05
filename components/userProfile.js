import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import styles from '../styles/UserProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// Renommage nécessaire pour éviter un conflit de nom avec le hook useState
import { setSelectedTripId, setTrips, setTripDetails } from '../reducers/user';


const UserProfile = ({ username }) => {
   // Il initialise plusieurs états locaux pour gérer l'affichage de la photo de profil, la liste des voyages, et la visibilité d'une modal
  const [profilePicture, setProfilePicture] = useState('');
  //const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
   // Il utilise useSelector pour accéder à des parties de l'état Redux, telles que le statut de connexion et le token utilisateur
  const isLoggedIn = useSelector((state) => state.user.value.isLoggedIn);
  const token = useSelector((state) => state.user.value.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const trips = useSelector((state) => state.user.value.trips);
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId)

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/trips/deleteTrip/${tripId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Échec de la suppression du voyage');
      }

      const updatedTrips = trips.filter(trip => trip.id !== tripId);
      dispatch(setTrips(updatedTrips));
      alert('Voyage supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du voyage:', error);
      alert(error.message);
    }
  };

  
 // On utilise useEffect pour charger les voyages de l'utilisateur dès que le composant est monté ou que le token change
  useEffect(() => {
    const fetchTrips = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/trips/myTrips', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch trips');
          }
          const data = await response.json();
          console.log("Données récupérées :", data); 

          // Pour afficher spécifiquement l'ID et le contenu de chaque voyage
          if (data.trips && data.trips.length > 0) {
            data.trips.forEach(trip => {
              console.log(`ID du voyage: ${trip.id}, Nom: ${trip.name}, Lieu: ${trip.location}`);
            });
          }

            // Il dispatche l'action setTrips avec les données récupérées pour mettre à jour l'état global
            dispatch(setTrips(data.trips)); 
            setProfilePicture(data.userPicture);
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    fetchTrips();
  }, [token, dispatch]);

  const fetchTripDetails = async (tripId) => {
    try {
      const response = await fetch(`http://localhost:3000/trips/${tripId}`,{   
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch trip details');
      }
      const data = await response.json();
      dispatch(setTripDetails(data)); // Met à jour l'état global avec les détails du voyage
      router.push('/Dashboard'); // Navigue vers le dashboard du voyage
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du voyage:", error);
    }
  };
  // Navigue vers le dashboard du voyage sélectionné
  const handleGoToDashboard = (tripId) => {
    dispatch(setSelectedTripId(tripId));
    fetchTripDetails(tripId);
  };

  // Il gère le changement du fichier sélectionné pour la photo de profil
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Tentative de soumission du formulaire");

      setSelectedFile(file);
    }
  };
   // Il gère la soumission du formulaire pour mettre à jour la photo de profil
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    if (selectedFile) {
      const formData = new FormData();
      formData.append('userPicture', selectedFile);
      console.log("Préparation de l'envoi du fichier", formData);

      try {
        const response = await fetch('http://localhost:3000/users/profilePicture', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to update profile picture');
        const data = await response.json();
        console.log("Réponse du serveur :", data);
        setProfilePicture(data.userPicture);
        setShowModal(false);
      } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        console.error(error);
      }
    }
  };
   // Il gère le clic sur le bouton pour ajouter un nouveau voyage
  const handleNewTripClick = () => {
    router.push('/addTrip');
  };
  return (
   
      <div className={styles.container}>
        {isLoggedIn && (
          <div className={styles.profileTitle}>
            <img src={profilePicture} alt={`${username}'s profile`} className={styles.picture} />
            <button className={styles.change} onClick={() => setShowModal(true)}>Changer la photo</button>
            {showModal && (
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={handleSubmit} className={styles.file}>
                  <input id="file" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                  <label htmlFor="file" className={styles.fileInputLabel}>
                      Choisir le fichier
                     </label>
                  <button className={styles.submitBtn} type="submit">Soumettre</button>
                </form>
              </Modal>
            )}
          </div>
          )}
        <h2 className={styles.mytravel}>Mes voyages</h2>
        <div className={styles.tripsContainer}>
        {trips ? (
          trips.map((trip, index) => (
            <div key={index} className={styles.tripInfo}>
              <span>{trip.name}</span>
                <button
                   className={styles.delete} 
                   onClick={() => handleDeleteTrip(trip.id)}
                >
                  Supprimer
                </button>
               
               <div className={styles.goContainer}>
                 <button className={styles.go} onClick={() => handleGoToDashboard(trip.id)}>Go</button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun voyage trouvé.</p>

        )}
         
           <button onClick={handleNewTripClick} className={styles.trip}>Nouveau voyage</button>
        </div>   
      </div>
  
   
  );
};


export default UserProfile;
