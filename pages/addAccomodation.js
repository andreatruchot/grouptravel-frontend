// pages/addAccommodation.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccomodationForm from '../components/forms/AccomodationForm';
import styles from '../styles/AddAccomodation.module.css';


const AddAccommodationPage = () => {
  return (
    <div>
       <Header />
      <AccomodationForm />
      <Footer/>
    </div>
  );
};

export default AddAccommodationPage;
