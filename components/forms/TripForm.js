
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr'; // importe le locale français
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // utilise `useRouter`
import styles from '../../styles/TripForm.module.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

registerLocale('fr', fr); // enregistre le locale

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
          router.push('/Dashboard');
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

  <div className={styles.dates}>
     <p className={styles.datesTitle}>On définit les dates du voyage</p>
     <div className={styles.datep}>
       <div className={styles.departure}>
          <DatePicker
            locale="fr"
            dateFormat="dd/MM/yyyy"
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            customInput={
            <button type="button" className={styles.datePickerButton}>
              <FontAwesomeIcon icon={faCalendarAlt} />  depart 
            </button>
           }
          />
       </div>
       <div className={styles.return}>
         <DatePicker
            locale="fr"
            dateFormat="dd/MM/yyyy"
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            customInput={
            <button type="button" className={styles.datePickerButton}>
              <FontAwesomeIcon icon={faCalendarAlt} /> retour 
            </button>
            }
          />
       </div>
     </div>
   </div>
   <div className={styles.location}>
     <label className={styles.here}>Où partez-vous ?</label>
      <input
         className={styles.input} id="place"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Lieu du voyage"
      />
  </div>   
  <div className={styles.name}>
     <div className={styles.combi}>
        <img src="../images/form/van-aquarelle.jpg" alt='aquarelle combi volkswagen dans la nature' className={styles.pass}></img>
     </div>
     <div className={styles.formName}>
         <label className={styles.choice}>Et là on choisit un nom pour le Voyage</label>
         <input
               className={styles.inputName} id="name"
               type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="un nom de voyage"
          />
         <button  className={styles.create}type="submit" disabled={loading}>
           {loading ? 'Chargement...' : 'Créer'}
         </button>
           {error && <div>{error}</div>}
       </div>
     </div>
</form>
  );
};

export default TripForm;
