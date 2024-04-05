// pages/addTrip.js
import React from 'react';
import TripForm from '../components/forms/TripForm';
import styles from '../styles/AddTrip.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


const AddTripPage = () => {
  return (
    <>
      <Header />
    <div className={styles.containerFull}>
       <div className={styles.title}>
           <img src="../images/stickers/sacados.png" alt='stickers sac à dos ' className={styles.stickers2}></img>
           <h2 className={styles.name}>Mon voyage</h2>
       </div>
       <TripForm />
       <Footer/>
    </div>
    </>
  );
};

export default AddTripPage;
