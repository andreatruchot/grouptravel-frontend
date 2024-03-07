import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // Assurez-vous que cela est correctement importé pour utiliser `useRouter`
import styles from '../../styles/ActivityForm.module.css';

const TripForm = () => {

    const [activityName, setActivityName] = useState('');
    const [description, setDescription] = useState('');
    const [returnDate, setReturnDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [Url, setUrl] = useState('');
    const router = useRouter();
    const [photos, setPhotos] = useState([]);

   
  
    // Utilise useSelector pour accéder à l'état du store Redux
const token = useSelector(state => state.user.value.token);

const handleFileChange = (e) => {
        // Limite à deux fichiers
        setPhotos([...e.target.files].slice(0, 2));
    };


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', activityName);
    formData.append('location', location);
    formData.append('Url', Url); 
    formData.append('description', description);
    formData.append('returnDate', returnDate.toISOString());
    photos.forEach((photo, index) => {
        if (index < 2) { // Limite à deux photos
            formData.append(`photos`, photo); // `photos` comme clé pour chaque fichier
        }
    });

    try {
        const response = await fetch('/api/addTrip', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Inclusion du  token d'authentification pour le user member
            },
            body: formData,
          });
          const responseData = await response.json();

          if (response.ok) {
            // Gestion de la réussite, par exemple, rediriger vers le tableau de bord
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

  <h2>Une activité à proposer?</h2>

  <label>Date</label>
      <DatePicker
        selected={departureDate}
        onChange={(date) => setDepartureDate(date)}
      />

     <label>lieu</label>
      <input
         className={styles.input} id="place"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Lieu de l'activité"
      /> 
       <input
        className={styles.input} id="photo"
         type="file"
         accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
         />
      <label>Le nom de l'activité</label>
      <input
         className={styles.input} id="name"
        type="text"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        placeholder="un nom de groupe"
      />
        <textarea
       className={styles.what} 
        id="describe" 
        value={description}
       onChange={(e) => setDescription(e.target.value)}
       placeholder="Description de l'hébergement"
      />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL de l'activité"
        pattern="https?://.+"
        title="entrer une URL valide"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Chargement...' : 'Créer'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default TripForm;













<input
className={styles.input} id="photo"
 type="file"
 accept=".jpg,.jpeg,.png"
  onChange={handleFileChange}
 multiple
 />
 