import React, { useEffect, useState } from 'react';

import styles from '../styles/Planning.module.css'; 
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyCard from '../components/MyCard';



const Planning = () => {
    const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
    const token = useSelector(state => state.user.value.token);
    const [planning, setPlanning] = useState({});
    const [activities, setActivities] = useState([]);

    

    useEffect(() => {
        const fetchPlanning = async () => {
            try {
                const response = await fetch(`https://grouptravel-backend-rho.vercel.app/planning/planning/${selectedTripId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch planning');
                const data = await response.json();
                setPlanning(data.planning);
            } catch (error) {
                console.error("Error fetching planning:", error);
            }
        };
        fetchPlanning();
    }, [selectedTripId, token]);
    const handleDelete = async (activityId) => {
        if(window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
            try {
              const response = await fetch(`https://grouptravel-backend-rho.vercel.app/activities/${activityId}`, {
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
    

    return (
        <>
        <Header />
        <div className={styles.containerFull}>
                <div className={styles.title}>
                <img src="../images/stickers/carpe.png" alt='stickers de maki' className={styles.stickers}></img>
                    <h1 className={styles.name}>Planning</h1>
                </div>
                <h2 className={styles.subtitle}>Activités du séjour</h2>
                <div className={styles.planningContainer}>
                    {Object.keys(planning).sort().map((day) => {
                        const dayDate = new Date(day);
                        const dayMonth = dayDate.getUTCDate() + ' ' + dayDate.toLocaleString('fr-FR', { month: 'short' });
                        return (
                            <div key={day} className={styles.dayColumn}>
                                <div className={styles.dateTitle}>{dayMonth}</div>
                                <div className={styles.activitiesBlock}>
                                    {planning[day].activities && planning[day].activities.map(activity => (
                                        <div key={activity._id} className={styles.activitiesGrid}>
                                            <MyCard
                                                additionalStyles={{ backgroundColor: '#EBD5C8', padding: '10%' }}
                                                imageUrl={activity.photo}
                                                title={activity.name}
                                                subtitle={`Lieu: ${activity.place}`}
                                                date={`Date: ${new Date(activity.date).toLocaleDateString('fr-FR')}`}
                                                content={activity.description}
                                                budget={activity.budget}
                                                showVoteButtons={false}
                                                cardBodyStyle={{ backgroundColor: '#EBD5C8' }}
                                                onDelete={() => handleDelete(activity._id)}
                                                showDeleteButton = {true}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            
            <Footer />
        </div>
    </>
    );
};

export default Planning;
