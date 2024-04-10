import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../../styles/ActivityForm.module.css';
import { addActivity, setTripDetails } from '../../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../../components/ImageUpload';


const ActivityForm = () => {
  const router = useRouter();
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
  const token = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch();
  const tripDetails = useSelector((state) => state.user.value.tripDetails || {});
  const { departureDate, returnDate } = tripDetails;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('');
  const [url, setUrl] = useState('');
  const [photo, setPhoto] = useState(null);
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Ici, on charge les détails du voyage en fonction de selectedTripId
    // et on met à jour l'état Redux via dispatch(setTripDetails(data)).
    
    if (selectedTripId) {
      const fetchTripDetails = async () => {
        try {
          const response = await fetch(`https://grouptravel-backend-rho.vercel.app/trips/details/${selectedTripId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch trip details');
          const data = await response.json();
          dispatch(setTripDetails(data));
        } catch (error) {
          console.error("Erreur lors du chargement des détails du voyage", error.message);
        }
      };

      fetchTripDetails();
    }
  }, [selectedTripId, token, dispatch]);

  useEffect(() => {
    // Utiliser departureDate pour initialiser `date`
    if (departureDate) {
      setDate(new Date(departureDate));
    }
  }, [departureDate]);

  const onFileSelect = (file) => {
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('place', place);
    formData.append('url', url);
    formData.append('description', description);
    formData.append('date', date.toISOString());
    formData.append('budget', budget);
    if (photo) {
      formData.append('photo', photo); 
    }

    try {
      const response = await fetch(`https://grouptravel-backend-rho.vercel.app/activities/addActivity/${selectedTripId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(addActivity(responseData));
        router.push('/Dashboard');
      } else {
        const responseData = await response.json();
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
     <ImageUpload className={styles.imageFirst} 
                   onFileSelect={(file) => onFileSelect(file, 0)}
                   buttonClassName={styles.customButtonStyle}
     />
   </div>
      <img src="../images/stickers/coliseee.png" alt='stickers du colisée' 
               className={styles.colisee}></img>
     </div>
     <div className={styles.containerRight} >

        <h2 className={styles.title}>Une activité à proposer ?</h2>
        <input
          className={styles.inputName}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Le nom de l'activité"
       />
        <input
          className={styles.inputPlace}
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
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
          onChange={(date) => setDate(date)}
          minDate={new Date(departureDate)} 
          maxDate={new Date(returnDate)}
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












