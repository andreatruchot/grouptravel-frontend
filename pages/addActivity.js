import React from 'react';
import ActivityForm from '../components/forms/ActivityForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/AddActivity.module.css';

const addActivityPage = () => {
  return (
    <>
     <Header />
     <div className={styles.containerFull}>
       <div className={styles.formContainer}>
          <ActivityForm />
        </div>
        <Footer />
     </div>
  </>
  );
};

export default addActivityPage;
