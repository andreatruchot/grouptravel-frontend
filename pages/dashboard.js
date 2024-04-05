// Importations nécessaires pour utiliser React, Redux, Next.js et les composants/style personnalisés
import { useSelector, useDispatch} from 'react-redux';
import Header from '../components/Header';
import styles from '../styles/Dashboard.module.css';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import Chat from '../components/Chat';
import { setTrips } from '../reducers/user';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importation dynamique du composant Map pour éviter le rendu côté serveur (SSR)
const Map = dynamic(() => import('../components/Map'), { ssr: false });


const DashboardPage = () => {

  // Hooks pour interagir avec Redux et le routeur Next.js
  const dispatch = useDispatch();
  // State local pour stocker la localisation actuelle
  const [location, setLocation] = useState('');
  const router = useRouter();
  
 //  logique pour récupérer l'utilisateur actuel 
 const userId = useSelector((state) => state.user.value.userId); 

  // Destructuration pour un accès direct aux propriétés nécessaires
  const { selectedTripId, trips, token } = useSelector((state) => state.user.value);
  console.log("Selected Trip ID from state:", selectedTripId);

  // Tentative de trouver les détails du voyage
  const tripDetails = trips.find(trip => trip.id === selectedTripId);
  console.log('Found Trip Details:', tripDetails);
  const isAdmin = tripDetails && tripDetails.admin === userId;

  // Effet pour charger les voyages de l'utilisateur après le rendu initial
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

  // Effet pour charger les détails du voyage sélectionné
  useEffect(() => {
    // Défini une fonction asynchrone interne pour faire la requête
    const fetchTripDetails = async () => {
      // Vérifie si selectedTripId est défini et n'est pas null avant de faire la requête
      if (selectedTripId) {
        try {
          const response = await fetch(`http://localhost:3000/trips/location/${selectedTripId}`);
          
          // Vérifie le statut de la réponse
          if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
          }
          
          // Vérifie que le contenu de la réponse est du JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error("La réponse n'est pas du JSON");
          }
          
          // Parse la réponse JSON
          const data = await response.json();
          // Met à jour l'état avec la localisation obtenue
          setLocation(data.location);
        } catch (error) {
          console.error("Erreur lors de la récupération des détails du voyage :", error);
         
        }
      } else {
        console.log('selectedTripId est indéfini ou null, aucune requête envoyée.');
      }
    };
  
    // Appelle la fonction asynchrone interne
    fetchTripDetails();
  }, [selectedTripId]); // L'effet dépend de selectedTripId pour se réexécuter lorsque l'ID change
  

  // Gestion de l'absence de détails pour le voyage sélectionné
  if (!tripDetails) {
    return (
      <div className={styles.dashboard}>
        <Header />
        <p>Aucun détail disponible pour le voyage sélectionné.</p>
      </div>
    );
    
    }
      // Handlers pour la navigation entre différentes pages
      
    // Fonction pour naviguer vers Planning
    const handlePlanningSelectClick = () => {
      router.push('/Planning');
    };

   // Fonction pour naviguer vers AddActivity
   const handleAdminSelectClick = () => {
    router.push('/AdminSelection');
  };

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
  const handleChatClick = () => {
    // Redirige l'utilisateur vers la page d'invitation en passant l'ID du voyage sélectionné
    router.push('/ChatPage');
  };
  const handleAlbumClick = () => {

    router.push('/AlbumPage');
  };
  const handleAddPicturesClick = () => {

    router.push('/AddPictures');
  };
    // Rendu des détails du voyage sélectionné
    console.log("Membres du voyage avec username:", tripDetails.members);
  
  // Rendu des détails du voyage sélectionné
  return (
<>
<Header />
 <div className={styles.containerFull}>
   <div className={styles.title}>
   <img src="../images/stickers/crisier.png" alt='stickers de cerisier japonnais' className={styles.stickers2}></img>
      <h1 className={styles.name}>{tripDetails.name}</h1>
   </div>
  <div className={styles.tripContainer}>
    <div className={styles.firstContainer}>
       <div className={styles.planning}>
          <h2  className={styles.subtitle}>Planning</h2>

          <button onClick={handlePlanningSelectClick}className={styles.buttonP}>Planning</button>
          {       
          tripDetails.isAdmin &&(
           <button onClick={handleAdminSelectClick} className={styles.buttonS}>Sélection</button>
            )
          }
       </div>
       <div className={styles.budget}>
          <h2  className={styles.subtitle}>Infos Pratiques</h2>
          <span className={styles.totalBudget} >Budget total du voyage: {tripDetails.budget} €</span>
          <h3 className={styles.during}>Dates du séjour</h3>
          <div className={styles.date}>
          <div className={styles.date1}> {new Date(tripDetails.departureDate).toLocaleDateString()}</div>
          <div> {new Date(tripDetails.returnDate).toLocaleDateString()}</div>
       </div>
       </div>
       <div className={styles.accommodations}>
          <h2 className={styles.subtitle}>Hébergements</h2>
                 {tripDetails.accomodations.map((accomodation, index) => (
              <div key={index}>
               <p>{accomodation.location}</p>
               <p className={styles.votes}>votes :  {
                accomodation.vote.filter(vote => vote.status).length
            }</p>   
              </div>
              ))} 
             <button onClick={handleAddAccomodationClick}className={styles.buttonH}>+</button> 
             <button onClick={handleAccomodationClick}className={styles.buttonA}>voter</button>              
       </div>
       <div className={styles.imagedeco}>
        <img src="../images/palmier.jpg" alt='photo de palmiers' className={styles.stickersM}></img>
        </div>
     </div>
     <div className={styles.secondContainer}>
       <div className={styles.activities}>
          <h2 className={styles.subtitle}>Activités</h2>
          {tripDetails.activities.map((activity) => (
          <div key={activity._id}>
            <p className={styles.names}>{activity.name}</p>
            <p className={styles.votes}>participants:  {
              activity.participation.filter(participant => participant.status).length
        }</p>
          </div>
          ))}
           <button onClick={handleAddActivityClick} className={styles.buttonH}>+</button>
           <button onClick={ handleActivityClick } className={styles.buttonL}>voter</button>
        </div>
        <div className={styles.map}>
         {tripDetails && tripDetails.location && (
          <div className={styles.mapContainer}>
            <Map location={tripDetails.location} />
          </div>
        )}
       </div>
       <div className={styles.album}>
         <h2 className={styles.subtitle}>Album</h2>
         <button onClick={handleAddPicturesClick} className={styles.buttonH}>+</button>
         <button onClick={handleAlbumClick}className={styles.buttonAlbum}>Album photo</button> 
      </div>
      <div className={styles.van}>
          <img src="../images/stickers/vanbagages.png" alt='stickers de van' className={styles.stickersVan}></img>
      </div>
     </div>
     <div className={styles.thirdContainer}>
       <div className={styles.groupMembers}>
          <h2 className={styles.subtitle}>Membres du groupe</h2>
          {tripDetails.members && tripDetails.members.length > 0 ? (
           tripDetails.members.map((member, index) => (
            <div key={index}>
            
              <p>{member.username}</p>
           </div>
            ))
         ) : (
         <p>Pas de membres à afficher</p>
         )}
          <button onClick={handleInviteFriendClick} className={styles.buttonM}>Inviter</button>
       </div>
       <div className={styles.chatContainer}>
         <h2 className={styles.subtitle}>Chat</h2>
         <Chat />
         <button onClick={handleChatClick } className={styles.buttonChat}>Chat</button>
       </div>
    </div>
  </div>
  <Footer/>
</div>
</>
);
};


export default DashboardPage;
