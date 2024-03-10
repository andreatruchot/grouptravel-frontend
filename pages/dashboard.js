// pages/dashboardPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import styles from '../styles/Dashboard.module.css';

const DashboardPage = () => {
  // Récupération du nom du voyage actuellement sélectionné depuis l'état global
  const tripName = useSelector(state => state.user.value.tripName);
  // Récupération de tous les voyages de l'utilisateur depuis l'état global
// Correction de l'accès à l'état trips
const trips = useSelector(state => state.user.value.trips);

  
  // Trouve les détails du voyage sélectionné parmi tous les voyages
  const tripDetails = trips.find(trip => trip.name === tripName);

  // Gestion si aucun voyage n'est trouvé
  if (!tripDetails) {
    return (
      <div className={styles.dashboard}>
        <Header />
        <p>Aucun détail disponible pour le voyage sélectionné.</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <Header />
      <h1>Dashboard du Voyage: {tripDetails.name}</h1>
      <div>Location: {tripDetails.location}</div>
      <div>Date de départ: {new Date(tripDetails.departureDate).toLocaleDateString()}</div>
      <div>Date de retour: {new Date(tripDetails.returnDate).toLocaleDateString()}</div>
      {/* Affichez plus de détails ici selon vos besoins */}
    </div>
  );
};

export default DashboardPage;
