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
        console.log(data.accomodations);
        setAccomodations(data.accomodations);
      } else {
        alert(data.message);
        
      }
    })
    .catch(error => console.error("Erreur lors de la récupération des hébergements:", error));
   
  },  [selectedTripId, token]);
   

  const handleVote = async (accomodationId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/accomodations/vote/${accomodationId}`, {
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
          updateAccomodationStatus(accomodationId, data.status); // fonction pour mettre à jour l'état
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
  const handleDeleteAccomodation = async (accomodationId) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cet hébergement ?")) {
        try {
          const response = await fetch(`http://localhost:3000/accomodations/${accomodationId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
             
              Authorization: `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            alert("Hébergement supprimé avec succès.");
             // Met à jour la liste des hébergements pour enlever l'hébergement supprimé
             const updatedAccomodations = accomodations.filter(accomodation => accomodation._id !== accomodationId);
             setAccomodations(updatedAccomodations);
            // Rafraîchit les hébergements affichés ici, par exemple en rechargent les données du voyage
          } else {
            const data = await response.json();
            throw new Error(data.message || "Erreur lors de la suppression de l'hébergement.");
          }
        } catch (error) {
          alert(error.message);
        }
      }
    };
    
  return (

<div>
  <Header />
  <div className={styles.containerFull}>
    <div className={styles.title}>
      <h1 className={styles.name}>Hébergements</h1>
      <img src="../images/stickers/eiffel.png" alt='stickers tour Eiffel' className={styles.stickers2}></img>
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
               // Formatage des dates d'arrivée et de départ
               arrivalDate={new Date(accomodation.arrivalDate).toLocaleDateString()}
               returnDate={new Date(accomodation.returnDate).toLocaleDateString()} 
               showDates={true}
              content={accomodation.description}
              arrival={accomodation.arrivalDate}
              return={accomodation.returnDate}
              budget={accomodation.budget}
              voteCount={accomodation.vote.filter(vote => vote.status).length} 
              onVote={(status) => handleVote(accomodation._id, status)}
              onDelete={() => handleDeleteAccomodation(accomodation._id)}
              showDeleteButton={true}
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
