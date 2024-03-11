import React from 'react';
import ActivityForm from '../components/forms/ActivityForm';
import Header from '../components/Header';





const addActivityPage = () => {
  return (
    <div>
       <Header />
      <h1>Une idée d'Activité?</h1>
      <ActivityForm />
    </div>
  );
};

export default addActivityPage;
