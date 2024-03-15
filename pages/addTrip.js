// pages/addTrip.js
import React from 'react';
import TripForm from '../components/forms/TripForm';
import styles from '../styles/AddTrip.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


const AddTripPage = () => {
  return (
    <div className={styles.main}>
       <div className={styles.header}>
       <Header />
    </div>
    <div className={styles.banner}>
      <h2 className={styles.title}>C’est le moment de créer un voyage</h2>
    </div>
    <div className={styles.photo}>
           <img src="../images/stickers/appphot.png" alt='stickers appareil photo' className={styles.camera}></img>
    </div>
      <TripForm />
      <Footer/>
    </div>
  );
};

export default AddTripPage;
