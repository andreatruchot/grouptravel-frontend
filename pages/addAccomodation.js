// pages/addAccommodation.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccomodationForm from '../components/forms/AccomodationForm';
import styles from '../styles/AddAccomodation.module.css';


const AddAccommodationPage = () => {
  return (
    <>
     <Header />
    <div className={styles.containerFull}>
       <div className={styles.formContainer}>
      <AccomodationForm />
   
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default AddAccommodationPage;
