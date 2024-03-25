import React, { useEffect, useState } from 'react';
import styles from '../styles/Accomodations.module.css'; 
import { useSelector} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyCard from '../components/MyCard';


function Accomodations() {
 
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
  const token = useSelector(state => state.user.value.token);
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
   
    fetch(`http://localhost:3000/accomodations/${selectedTripId}`, {
      method: 'GET',
      headers: {
       
        'Authorization': `Bearer ${token}`,
        
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setAccomodations(data.accomodations);
      } else {
        alert(data.message); 
      }
    })
    .catch(error => console.error("Erreur lors de la récupération des activités:", error));
  }, [selectedTripId]); 

  const handleVote = async (accomodationId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/accomodations/vote/${accomodationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: status.toString() }), // Assurez-vous que le statut est une chaîne si nécessaire
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status !== undefined) {
          updateAccomodationStatus(accomodationId, data.status); // Implémentez cette fonction pour mettre à jour l'état
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
  const updateAccomodationStatus = (accomodationId, newStatus) => {
    setAccomodations(currentAccomodations => currentAccomodations.map(accomodation => {
      if (accomodation._id === accomodationId) {
        return { ...accomodation, voted: newStatus };
      }
      return accomodation;
    }));
  };

  return (

<div>
  <Header />
  <div className={styles.accomodationsContainer}>
    <div className={styles.accomodationsTitle}>
      <h1 className={styles.title}>Hébergements</h1>
      <img src="../images/stickers/eiffel.png" alt='stickers tour Eiffel' className={styles.stickers}></img>
    </div>
    <div>
    <h2 className={styles.Subtitle}>Quel Hébergement choisir ?</h2>
     </div>
    <div className={styles.accomodationsGrid}>
          {accomodations.map((accomodation, index) => (
            <MyCard
              key={accomodation._id}
              imageUrl={accomodation.photo}
              title={accomodation.location}
              content={accomodation.description}
              arrival={accomodation.arrivalDate}
              departure={accomodation.returnDate}
              budget={accomodation.budget}
              onVote={(status) => handleVote(accomodation._id, status)}
            />
          ))}
        </div>
        <img src="../images/stickers/croissant.png" alt='stickers croissant' className={styles.stickers2}></img>
  </div>
  <Footer/>
</div>
  );
}
export default Accomodations;
