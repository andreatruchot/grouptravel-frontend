import React, { useEffect, useState } from 'react';
import styles from '../styles/Activities.module.css'; 
import { useSelector} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyCard from '../components/MyCard';



function Activities() {
 
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
  const token = useSelector(state => state.user.value.token);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
   
    fetch(`https://grouptravel-backend-rho.vercel.app/activities/${selectedTripId}`, {

      method: 'GET',
      headers: {
       
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setActivities(data.activities);
      } else {
        alert(data.message); 
      }
    })
    .catch(error => console.error("Erreur lors de la récupération des activités:", error));
  }, [selectedTripId, token]); 
  
  const handleVote = async (activityId, status) => {
    try {
      const response = await fetch(`https://grouptravel-backend-rho.vercel.app/activities/vote/${activityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: status.toString() }), 
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status !== undefined) {
          updateActivityStatus(activityId, data.status); 
          console.log("Vote enregistré avec succès.");
        } else {
          console.error("Réponse du serveur incomplète.");
        }
      } else {
        console.error("Erreur lors de la soumission du vote :", response.statusText);
        alert("Erreur lors de la soumission du vote. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du vote :", error.message);
      alert("Erreur lors de la soumission du vote. Veuillez réessayer.");
    }
  };
  const updateActivityStatus = (activityId, newStatus) => {
    setActivities(currentActivities => currentActivities.map(activity => {
      if (activity._id === activityId) {
        return { ...activity, voted: newStatus };
      }
      return activity;
    }));
  };
  
  return (

<div>
  <Header />
<div className={styles.containerFull}>
  <div className={styles.title}>
      <h1 className={styles.name}>Activités</h1>
      <img src="../images/stickers/geisha.png" alt='stickers geisha' className={styles.stickers2}></img>
   </div>
   <h2 className={styles.Subtitle}>Il est temps de décider de participer aux activités</h2>
  <div className={styles.container}>
   <div className={styles.activitiesGrid}>
          {activities.map((activity, index) => (
            <MyCard
              key={activity._id}
              imageUrl={activity.photo}
              title={activity.name}
              subtitle={`Lieu: ${activity.place}`}
              date={`Date: ${new Date(activity.date).toLocaleDateString()}`}
              content={activity.description}
              budget={activity.budget}
              voteCount={activity.participation.filter(participant => participant.status).length} // Ajout du nombre de votes "oui"
              onVote={(status) => handleVote(activity._id, status)}
            />
          ))}
        </div>
     </div>
        <img src="../images/stickers/ramen.png" alt='stickers ramen' className={styles.stickers2}></img>
  </div>
  <Footer/>
</div>
  );
}
export default Activities;
