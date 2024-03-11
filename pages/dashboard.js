import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import styles from '../styles/Dashboard.module.css';
import { useRouter } from 'next/router';




const DashboardPage = () => {
  const router = useRouter(); 
  // Destructuration pour un accès direct aux propriétés nécessaires
  const { selectedTripId, trips } = useSelector((state) => state.user.value);
  console.log("Selected Trip ID from state:", selectedTripId);

  // Tentative de trouver les détails du voyage
  const tripDetails = trips.find(trip => trip.id === selectedTripId);
  console.log('Found Trip Details:', tripDetails);

  // Gestion de l'absence de détails pour le voyage sélectionné
  if (!tripDetails) {
    return (
      <div className={styles.dashboard}>
        <Header />
        <p>Aucun détail disponible pour le voyage sélectionné.</p>
      </div>
    );
    
    }
    const handleAddActiviyClick = () => {
      router.push('/AddActivity');
  }

  // Rendu des détails du voyage sélectionné
  return (
    <div className={styles.dashboard}>
      <Header />
      <h1>Dashboard du Voyage: {tripDetails.name}</h1>
      {/* Informations de base du voyage */}
      <div>Location: {tripDetails.location}</div>
      <div>Date de départ: {new Date(tripDetails.departureDate).toLocaleDateString()}</div>
      <div>Date de retour: {new Date(tripDetails.returnDate).toLocaleDateString()}</div>
      <div>Budget total du voyage: {tripDetails.budget} €</div>

      <div>
        <h2>Activités</h2>
        {tripDetails.activities.map((activity, index) => (
          <div key={index}>
            <p>Nom: {activity.name}</p>
            <p>Lieu: {activity.place}</p>
            <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
            <p>Budget: {activity.budget} €</p>
            {/* Plus de détails selon vos besoins */}
            <button onClick={handleAddActiviyClick} className={styles.trip}>Nouveau voyage</button>
          </div>
        ))}
    </div>
    </div>
  );
};

export default DashboardPage;
