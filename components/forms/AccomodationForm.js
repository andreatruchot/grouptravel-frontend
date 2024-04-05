import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; 
import styles from '../../styles/AccomodationForm.module.css';
import { addAccomodation, setTripDetails } from '../../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../../components/ImageUpload';



const AccommodationForm = () => {

  const router = useRouter();
  const selectedTripId = useSelector((state) => state.user.value.selectedTripId);
  const token = useSelector(state => state.user.value.token);
  const dispatch = useDispatch();
  const tripDetails = useSelector((state) => state.user.value.tripDetails || {});
  const { departureDate, returnDate: tripReturnDate  } = tripDetails;

 

 
  const [location, setLocation] = useState('');
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [photo, setPhoto] = useState(null); 
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState(''); 

  useEffect(() => {
    // Ici, on charge les détails du voyage en fonction de selectedTripId
    // et on met à jour l'état Redux via dispatch(setTripDetails(data)).
    
    if (selectedTripId) {
      const fetchTripDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/trips/details/${selectedTripId}`, {
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
    // Initialise arrivalDate à departureDate du voyage ou à la date actuelle si non disponible
    if (departureDate) {
      setArrivalDate(new Date(departureDate));
    } else {
      setArrivalDate(new Date());
    }
  
    // Initialise returnDate pour l'hébergement à tripReturnDate du voyage ou à la date actuelle si non disponible
    if (tripReturnDate) {
      setReturnDate(new Date(tripReturnDate));
    } else {
      setReturnDate(new Date());
    }
  }, [departureDate, tripReturnDate]);
  
  

  const onFileSelect = (file) => {
    console.log(file);
    setPhoto(file);
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
formData.append('returnDate', returnDate.toISOString());
if (photo) {
  formData.append('photo', photo); 
}

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
     <ImageUpload className={styles.imageFirst} 
                   onFileSelect={(file) => onFileSelect(file, 0)}
                   buttonClassName={styles.customButtonStyle}
     />
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
           minDate={new Date(departureDate)}
           maxDate={new Date(tripReturnDate)}
           customInput={
            <button type="button" className={styles.ArrivalPickerButton}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Arrivée
            </button>
           }
         />
       
         <DatePicker
           selected={returnDate}
           onChange={(returnDate) => setReturnDate(returnDate)}
           minDate={new Date(departureDate)}
           maxDate={new Date(tripReturnDate)}
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
