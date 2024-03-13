import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; // Assurez-vous que cela est correctement importé pour utiliser `useRouter`
import styles from '../../styles/AccomodationForm.module.css';
import { addAccomodation } from '../../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../../components/ImageUpload';



const AccommodationForm = () => {

  const router = useRouter();
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
  const token = useSelector(state => state.user.value.token);
  const dispatch = useDispatch();

 
  const [location, setLocation] = useState('');
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [photos, setPhotos] = useState([]); 
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState(''); 

  

 // Met à jour l'état photos avec le nouveau fichier à l'index spécifié
 const onFileSelect = (file, index) => {
  let newPhotos = [...photos];
  newPhotos[index] = file;
  setPhotos(newPhotos);
};


const handleSubmit = async (e) => {
e.preventDefault();
setError('');

const formData = new FormData();

formData.append('location', location);
formData.append('url', url); 
formData.append('description', description);
formData.append('budget', budget);
formData.append('arrivalDate', arrivalDate.toISOString());
formData.append('departureDate', departureDate.toISOString());
 // Ajoute les fichiers d'images au formData
 photos.forEach((photo) => {
  if (photo) { // Vérifie si la photo est non nulle avant de l'ajouter
    formData.append('photos', photo);
  }
});

try {
  const response = await fetch(`http://localhost:3000/accomodations/addAccomodation/${selectedTripId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });


  if (response.ok) {
    const responseData = await response.json();
    console.log('hébergement ajoutée avec succès:', responseData);
    //dispatch de refreshTripDetails pour ajouter l'activité directement avant le retour sur le dashboard
    dispatch(addAccomodation(responseData));
    router.push('/Dashboard');
  } else {
    const responseData = await response.json(); // Pour  lire la réponse  en cas d'erreur
    throw new Error(responseData.error || 'Erreur lors de l’ajout de l'/'hebergement');
  }
} catch (err) {
  setError(err.message || 'Erreur lors de l’envoi des données.');
}
};
  return (
  <form className={styles.form} onSubmit={handleSubmit}>
     <div className={styles.containerLeft} >
          
     <div className={styles.images}>
      {/* Les autres champs du formulaire */}
      <ImageUpload className={styles.imageFirst} onFileSelect={(file) => onFileSelect(file, 0)} />
      <ImageUpload className={styles.imageSecond} onFileSelect={(file) => onFileSelect(file, 1)} />
    </div>
    <div className={styles.House}>
           <img src="../images/stickers/Maison.png" alt='stickers maison style new-yorkaise' className={styles.stickers}></img>
        </div>
      </div>
      <div className={styles.containerRight} >

         <h2 className={styles.title}>Un hébergement à proposer?</h2>
        
         <input
           className={styles.inputPlace}
           type="text"
           value={location}
           onChange={(e) => setLocation(e.target.value)}
           placeholder="Lieu et nom de l'hébergement"
        />
         <input
           className={styles.inputUrl}
           type="url"
           value={url}
           onChange={(e) => setUrl(e.target.value)}
           placeholder="URL du logement"
           pattern="https?://.+"
           title="Please enter a valid URL."
         />
         <div  className={styles.inpuDate}>
         <DatePicker
           selected={arrivalDate}
           onChange={(arrivalDate) => setArrivalDate(arrivalDate)}
           customInput={
            <button type="button" className={styles.ArrivalPickerButton}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Arrivée
            </button>
           }
         />
       
         <DatePicker
           selected={departureDate}
           onChange={(departureDate) => setDepartureDate(departureDate)}
           customInput={
            <button type="button" className={styles.DeparturePickerButton}>
              <FontAwesomeIcon icon={faCalendarAlt} />  Départ
            </button>
           }
         />
        </div>
        <span className={styles.budget}>
          <label className={styles.budgettitle}>budget</label>
         <input
           className={styles.inputbdget}
           type="text"
           value={budget}
           onChange={(e) => setBudget(e.target.value)}
           placeholder="Budget"
         />
        </span>
     
         <textarea
            className={styles.what} 
            id="describe" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de l'hébergement"
         />
         <button
          className={styles.btnsubmit} 
          type="submit">Soumettre</button>
          {error && <div>{error}</div>}
      </div>
    </form>
  );
}

export default AccommodationForm;
