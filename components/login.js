// Login.js
import React, { useState } from 'react';
import Button from './Button'; 
import SignIn from './SignIn';
import SignUp from './SignUp';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user'; 

import styles from '../styles/Login.module.css';

function Login() {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const dispatch = useDispatch();
    

   // Fonction pour gérer l'authentification réussie
   const handleAuthSuccess = (userData) => {
    dispatch(login(userData)); // Dispatche l'action de connexion avec les données de l'utilisateur
    setIsSignInModalVisible(false); // Ferme la modale de connexion
    setIsSignUpModalVisible(false); // Ferme la modale d'inscription
  };


  return (
    <>
      <Button
        className={styles.btnUp}
        text="inscription"
        onClick={() => setIsSignUpModalVisible(true)}
      />

       <Button
        className={styles.btnIn}
        text="connexion"
        onClick={() => setIsSignInModalVisible(true)}
      />

    
      <Modal isOpen={isSignInModalVisible} onClose={() => setIsSignInModalVisible(false)}>
        <SignIn onAuthSuccess={handleAuthSuccess}/>
      </Modal>

      <Modal isOpen={isSignUpModalVisible} onClose={() => setIsSignUpModalVisible(false)}>
        <SignUp onAuthSuccess={handleAuthSuccess}/>
      </Modal>
    </>
  );
}

export default Login;
