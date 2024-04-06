import React, { useEffect, useState } from 'react';
import MyCard from '../components/MyCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/AdminSelection.module.css';
import { useSelector} from 'react-redux';


const AdminActivityPage = () => {

    const [activities, setActivities] = useState([]);
    const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
    const token = useSelector(state => state.user.value.token);
  
    useEffect(() => {
        console.log("Selected Trip ID: ", selectedTripId);
        fetch(`https://grouptravel-backend-green.vercel.app/activities/${selectedTripId}`, {
          method: 'GET',
          headers: {
           
            'Authorization': `Bearer ${token}`,
            
          },
        })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setActivities(data.activities);
            // Filtre pour ne conserver que les activités non fixées
            const filteredActivities = data.activities.filter(activity => !activity.isFixed);
             setActivities(filteredActivities);
          } else {
            alert(data.message); 
          }
        })
        .catch(error => console.error("Erreur lors de la récupération des activités:", error));

      }, [selectedTripId]); 
      
  const handleSelectFixed = async (activityId) => {
    try {
        console.log(`Tentative de fixation pour le voyage ${selectedTripId} et l'activité ${activityId}`);
        
      const response = await fetch(`https://grouptravel-backend-green.vercel.app/activities/select/${selectedTripId}/${activityId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Utilisez votre méthode d'authentification
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert("Activité fixée avec succès.");

         // Mettre à jour la liste des activités pour enlever l'activité fixée
         const updatedActivities = activities.filter(activity => activity._id !== activityId);
         setActivities(updatedActivities);
        
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDelete = async (activityId) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
        try {
          const response = await fetch(`https://grouptravel-backend-green.vercel.app/activities/${activityId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Inclure le token JWT dans les headers si nécessaire
              Authorization: `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            alert("Activité supprimée avec succès.");
             // Met à jour la liste des activités pour enlever l'activité supprimée
             const updatedActivities = activities.filter(activity => activity._id !== activityId);
             setActivities(updatedActivities);
            // Rafraîchit les activités affichées ici, par exemple en rechargent les données du voyage
          } else {
            const data = await response.json();
            throw new Error(data.message || "Erreur lors de la suppression de l'activité.");
          }
        } catch (error) {
          alert(error.message);
        }
      }
  };

  //Requête pour appeler les hébergements
  useEffect(() => {
    console.log("Selected Trip ID: ", selectedTripId);
    fetch(`https://grouptravel-backend-green.vercel.app/accomodations/${selectedTripId}`, {
      method: 'GET',
      headers: {
       
        'Authorization': `Bearer ${token}`,
        
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        // Filtre pour ne conserver que les Hébergements non fixés
        const filteredAccomodations = data.accomodations.filter(accomodation => !accomodation.isFixed);
        setAccomodations(filteredAccomodations);
        

      } else {
        alert(data.message); 
      }
    })
    .catch(error => console.error("Erreur lors de la récupération des hébergements:", error));

  }, [selectedTripId]); 
  
const handleSelectFixedAccomodation = async (accomodationId) => {
try {
    console.log(`Tentative de fixation pour le voyage ${selectedTripId} et l'activité ${accomodationId}`);
    
  const response = await fetch(`https://grouptravel-backend-green.vercel.app/accomodations/select/${selectedTripId}/${accomodationId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    alert("Hébergement fixé avec succès.");

     // Mettre à jour la liste des hébergements pour enlever l'hébergement fixé
     const updatedAccomodations = accomodations.filter(accomodation => accomodation._id !== accomodationId);
     setAccomodations(updatedAccomodations);
    
  } else {
    const data = await response.json();
    throw new Error(data.message);
  }
} catch (error) {
  alert(error.message);
}
};

return (
<div>
  <Header/>
  <div className={styles.container}>
     <div className={styles.adminTitle}>
        <img src="../images/stickers/evantail.png" alt='stickers évantail' className={styles.stickers}></img>
         <h1 className={styles.title}>Sélections</h1>
     </div>
     <h2 className={styles.titleThird}>Ici on selectionne les activités</h2>
     <div>
     <h3 className={styles.Subtitle}>Activités</h3>
     <div className={styles.activSelect}>
       {activities.map((activity) => (
        <MyCard
        cardBodyStyle={{ backgroundColor: '#EBD5C8' }}
         additionalStyles={{ backgroundColor: '#EBD5C8' }}
          key={activity._id}
          imageUrl={activity.photo}
          title={activity.name}
          subtitle={`Budget: ${activity.budget}€`}
          content={activity.description}
          date={new Date(activity.date).toLocaleDateString()}
          voteCount={activity.participation.filter(participant => participant.status).length} // Ajout du nombre de votes "oui"
          isAdmin={true} // détermine si l'utilisateur actuel est l'admin
          onSelectFixed={() => handleSelectFixed(activity._id)}
          onDelete={() => handleDelete(activity._id)}
          showVoteButtons={true}
         
        />
      ))}
    </div>
    </div>
   
    </div>
    <Footer/>
  </div>

  );
};

export default AdminActivityPage;
