import React from 'react';
import ActivityForm from '../components/forms/ActivityForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const addActivityPage = () => {
  return (
    <div>
       <Header />
      <ActivityForm />
      <Footer />
    </div>
  );
};

export default addActivityPage;
