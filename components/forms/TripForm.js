import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // Assurez-vous que cela est correctement importé pour utiliser `useRouter`
import styles from '../../styles/tripForm.module.css';

const TripForm = () => {

    const [tripName, setTripName] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    

   
  
    // Utilise useSelector pour accéder à l'état du store Redux
const token = useSelector(state => state.user.value.token);


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const tripData = {
      name: tripName,
      location: location,
      departureDate: departureDate.toISOString(),
      returnDate: returnDate.toISOString(),
    };


    try {
      const response = await fetch('http://localhost:3000/trips/addTrip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', //envoi de données JSON
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(tripData), // Convertit l'objet JavaScript en chaîne JSON
      });
      const responseData = await response.json();

      if (response.ok) {
          // Gestion de la réussiteet  redirection vers le tableau de bord
          router.push('/dashboard');
      } else {
          throw new Error(responseData.error || 'Erreur lors de la création du voyage.');
      }
  } catch (err) {
      setError(err.message || 'Erreur lors de l’envoi des données.');
  } finally {
      setLoading(false);
  }
};
      
  return (

<form className={styles.form} onSubmit={handleSubmit}>

  <h2>là on met les dates du séjour</h2>

  <label>Date de départ</label>
      <DatePicker
        selected={departureDate}
        onChange={(date) => setDepartureDate(date)}
      />

      <label>Date de retour</label>
      <DatePicker
        selected={returnDate}
        onChange={(date) => setReturnDate(date)}
      />

     <label>ici le lieu</label>
      <input
         className={styles.input} id="place"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Lieu du voyage"
      />    

      <label>Ici on choisit un nom</label>
      <input
         className={styles.input} id="name"
        type="text"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        placeholder="un nom de voyage"
      />
     
      <button type="submit" disabled={loading}>
        {loading ? 'Chargement...' : 'Créer'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default TripForm;
