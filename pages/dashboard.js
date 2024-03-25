import React, {useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Header from '../components/Header';
import styles from '../styles/Dashboard.module.css';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { setSelectedTripId, setTrips, setTripDetails } from '../reducers/user';




const DashboardPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
 

  // Destructuration pour un accès direct aux propriétés nécessaires
  const { selectedTripId, trips, token } = useSelector((state) => state.user.value);
  console.log("Selected Trip ID from state:", selectedTripId);

  // Tentative de trouver les détails du voyage
  const tripDetails = trips.find(trip => trip.id === selectedTripId);
  console.log('Found Trip Details:', tripDetails);

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
           
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    fetchTrips();
  }, []);
 

  // Gestion de l'absence de détails pour le voyage sélectionné
  if (!tripDetails) {
    return (
      <div className={styles.dashboard}>
        <Header />
        <p>Aucun détail disponible pour le voyage sélectionné.</p>
      </div>
    );
    
    }

  const handleActivityClick = () => {
    router.push('/Activities');
  };

   // Fonction pour naviguer vers AddActivity
  const handleAddActivityClick = () => {
    router.push('/AddActivity');
  };
  // Fonction pour naviguer vers AddAccomodation
  const handleAddAccomodationClick = () => {
    router.push('/AddAccomodation');
  };
  // Fonction pour naviguer vers AddActivity
  const handleAccomodationClick = () => {
    router.push('/Accomodations');
  };

  const handleInviteFriendClick = () => {
    // Redirige l'utilisateur vers la page d'invitation en passant l'ID du voyage sélectionné
    router.push('/Invitation');
  };
    // Rendu des détails du voyage sélectionné
    console.log("Membres du voyage avec username:", tripDetails.members);
  
  // Rendu des détails du voyage sélectionné
  return (
   
<div className={styles.dashboard}>
  <div className={styles.header}>
       <Header />
  </div>
  <div className={styles.title}>
      <h1 className={styles.name}>{tripDetails.name}</h1>
      <img src="../images/stickers/crisier.png" alt='stickers de cerisier japonnais' className={styles.stickers2}></img>
   </div>
  <div className={styles.tripContainer}>
    <div className={styles.firstContainer}>
       <div className={styles.planning}>
          <h2  className={styles.titlePlanning}>Planning</h2>
          <img src="../images/stickers/billets.png" alt='stickers tickets de transports' className={styles.tickets}></img>
          <button className={styles.buttonP}>Planning</button>
       </div>
       <div className={styles.budget}>
          <h2  className={styles.titleBudget}>Infos Pratiques</h2>
          <span className={styles.totalBudget} >Budget total du voyage: {tripDetails.budget} €</span>
          <h3 className={styles.during}>Dates du séjour</h3>
          <div className={styles.date}>
          <div className={styles.date1}> {new Date(tripDetails.departureDate).toLocaleDateString()}</div>
          <div> {new Date(tripDetails.returnDate).toLocaleDateString()}</div>
       </div>
       </div>
       <div className={styles.accommodations}>
          <h2 className={styles.accommodationsTitle}>Hébergements</h2>
                 {tripDetails.accomodations.map((accomodation, index) => (
              <div key={index}>
               <p>{accomodation.location}</p>   
              </div>
              ))} 
             <button onClick={handleAddAccomodationClick}className={styles.buttonA}>Ajouter un un Hébergement</button> 
             <button onClick={handleAccomodationClick}className={styles.buttonA}>Détails et votes</button>              
       </div>
     </div>
     <div className={styles.secondContainer}>
       <div className={styles.activities}>
          <h2 className={styles.activitiesTitle}>Activités</h2>
          {tripDetails.activities.map((activity) => (
          <div key={activity._id}>
            <p className={styles.names}>{activity.name}</p>
            <p className={styles.votes}>participants:  {
           activity.participation.filter(participant => participant.status).length
        }</p>
          </div>
          ))}
           <button onClick={handleAddActivityClick} className={styles.buttonAc}>Ajouter une activité</button>
           <button onClick={ handleActivityClick } className={styles.buttonAc}>Détails et votes</button>
        </div>
     </div>
     <div className={styles.thirdContainer}>
       <div className={styles.groupMembers}>
          <h2 className={styles.groupTitle}>Membres du groupe</h2>
          {tripDetails.members && tripDetails.members.length > 0 ? (
      tripDetails.members.map((member, index) => (
        <div key={index}>
          <p>{member.username}</p>
        </div>
      ))
    ) : (
      <p>Pas de membres à afficher</p>
    )}
          <button onClick={handleInviteFriendClick} className={styles.buttonM}>Inviter un ami</button>
       </div>
       <div className={styles.chat}>
         <h2 className={styles.chatTitle}>Chat</h2>
         <div className={styles.chatMessage}>
         </div>

       </div>
     </div>
  </div>
  <Footer/>
</div>

);
};


export default DashboardPage;
