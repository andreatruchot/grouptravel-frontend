import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../../styles/activityForm.module.css';
import { addActivity } from '../../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../../components/ImageUpload';


const ActivityForm = () => {
  const router = useRouter();
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
  const token = useSelector(state => state.user.value.token);
  const dispatch = useDispatch();

  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('');
  const [url, setUrl] = useState('');
  const [photo, setPhoto] = useState(null);
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const ImageUpload = () => {
    const buttonStyle = {
      backgroundColor: '#EBD5C8' // lacouleur désirée
    }};

  // Met à jour l'état photos avec le nouveau fichier à l'index spécifié
 const onFileSelect = (file, index) => {
  let newPhotos = [...photos];
  newPhotos[index] = file;
  setPhotos(newPhotos);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', activityName);
    formData.append('place', place);
    formData.append('url', url);
    formData.append('description', description);
    formData.append('date', date.toISOString());
    formData.append('budget', budget);
    // Ajoute les fichiers d'images au formData
 photos.forEach((photo) => {
  if (photo) { // Vérifie si la photo est non nulle avant de l'ajouter
    formData.append('photos', photo);
  }
});
    try {
      const response = await fetch(`https://grouptravel-backend.vercel.app/activities/addActivity/${selectedTripId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

    
      if (response.ok) {
        const responseData = await response.json();
        console.log('Activité ajoutée avec succès:', responseData);
        //dispatch de refreshTripDetails pour ajouter l'activité directement avant le retour sur le dashboard
        dispatch(addActivity(responseData));
        router.push('/Dashboard');
      } else {
        const responseData = await response.json(); // Assurez-vous de lire la réponse même en cas d'erreur
        throw new Error(responseData.error || 'Erreur lors de l’ajout de l’activité.');
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
   <div className={styles.stickers}>
          <img src="../images/stickers/pyramides.png" alt='stickers des pyramides' className={styles.pyramides}></img>
  </div>
     </div>
     <div className={styles.containerRight} >

        <h2 className={styles.title}>Une activité à proposer?</h2>
        <input
          className={styles.inputName}
          type="text"
          value={activityName}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Le nom de l'activité"
       />
       
        <input
          className={styles.inputPlace}
          type="text"
          value={place}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Lieu de l'activité"
       />
        <input
          className={styles.inputUrl}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL de l'activité"
          pattern="https?://.+"
          title="Please enter a valid URL."
        />
        <div  className={styles.inpuDate}>
        <DatePicker
          selected={date}
          onChange={(date) => setdate(date)}
          customInput={
           <button type="button" className={styles.ArrivalPickerButton}>
             <FontAwesomeIcon icon={faCalendarAlt} /> Date
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
           placeholder="Description de l'activité"
        />
        <button
         className={styles.btnsubmit} 
         type="submit">Soumettre</button>
         {error && <div>{error}</div>}
     </div>
   </form>
 );
}




export default ActivityForm;












