import React from 'react';
import ActivityForm from '../components/forms/ActivityForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import  styles from '../styles/AddActivity.module.css';

const addActivityPage = () => {
  return (
    <div className={styles.container}>
       <Header />
      <ActivityForm />
      <Footer />
    </div>
  );
};

export default addActivityPage;
