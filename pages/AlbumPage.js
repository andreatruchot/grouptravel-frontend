import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/AlbumPage.module.css'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';


const AlbumPage = () => {

  
   const [photos, setPhotos] = useState([]);
   const router = useRouter();
   const { selectedTripId, token } = useSelector((state) => state.user.value);
   
 
   useEffect(() => {
     const fetchPhotos = async () => {
       if (selectedTripId) {
         try {
           const response = await fetch(`https://grouptravel-backend-xi.vercel.app/tripPictures/${selectedTripId}`,{   
           method: 'GET',
           headers: {
            Authorization: `Bearer ${token}`,
           },
         }); 
           if (!response.ok) throw new Error('Failed to fetch photos');
 
           const data = await response.json();
           console.log(data); // Vérifiez la structure de la réponse
           setPhotos(data);
      
         } catch (error) {
           console.error("Erreur lors de la récupération des photos", error);
         }
       }
     };
 
     fetchPhotos();
   }, [selectedTripId, token]);
return (
<>
  <Header />
  <div className={styles.containerFull}>
     <div className={styles.title}>
        <img src="../images/stickers/photo.png" alt='stickers appareil photo' className={styles.stickers2}></img>
         <h1 className={styles.name}>Album</h1>
     </div>
     <h2 className={styles.subtitle}>Souvenirs du voyages</h2>
     <div className={styles.wrapper}>
     <img src="../images/stickers/billets.png" alt='stickers billets avion' className={styles.stickers1}></img>
     {photos.map((photo, index) => (
  <div key={photo._id} className={styles.item}>
    <div className={styles.polaroid}>
       <img src={photo.photo} alt={photo.description} /> 
      <div className={styles.caption}>{photo.description}</div>
    </div>
  </div>
     ))}
     <img src="../images/converse .png" alt='stickers converse' className={styles.stickers3}></img>
  </div>
    <Footer/>
 </div>
</>

);
};
export default AlbumPage;