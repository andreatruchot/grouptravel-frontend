import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // Assurez-vous que cela est correctement importé pour utiliser `useRouter`
import styles from '../../styles/AccommodationForm.module.css';


function AccommodationForm() {
  const [accommodationName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [photos, setPhotos] = useState(''); 
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [tripId, setTripId] = useState(''); 

  const handleFileChange = (e) => {
    // Limite à deux fichiers
    setPhotos([...e.target.files].slice(0, 2));
};


const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setError('');

const formData = new FormData();
formData.append('name', accommodationName);
formData.append('location', location);
formData.append('Url', Url); 
formData.append('description', description);
formData.append('date', date.toISOString());
photos.forEach((photo, index) => {
    if (index < 2) { // Limite à deux photos
        formData.append(`photos`, photo); // `photos` comme clé pour chaque fichier
    }

    // Utilise useSelector pour accéder à l'état du store Redux
const token = useSelector(state => state.user.value.token);
});

try {
    const response = await fetch('/addActivity', {
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

  // Le rendu du composant
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
      />
       <input
        className={styles.input} id="photo"
         type="file"
         accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
         multiple
         />
         
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL du logement"
        pattern="https?://.+"
        title="Please enter a valid URL."
      />
     <textarea
       className={styles.what} 
        id="describe" 
        value={description}
       onChange={(e) => setDescription(e.target.value)}
       placeholder="Description de l'hébergement"
      />
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Budget"
      />
      <input
        type="text"
        value={tripId}
        onChange={(e) => setTripId(e.target.value)}
        placeholder="ID du voyage"
      />
      <button type="submit">Ajouter le logement</button>
    </form>
  );
}

export default AccommodationForm;
