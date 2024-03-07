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
    closeModal(); // Ferme toutes les modales
  };

  // Fonction pour fermer toutes les modales
  const closeModal = () => {
    setIsSignInModalVisible(false);
    setIsSignUpModalVisible(false);
  };

  return (
    <>
      <Button
        className={styles.btnUp}
        text="Inscription"
        onClick={() => setIsSignUpModalVisible(true)}
      />

      <Button
        className={styles.btnIn}
        text="Connexion"
        onClick={() => setIsSignInModalVisible(true)}
      />

      <Modal isOpen={isSignInModalVisible} onClose={closeModal}>
        <SignIn onAuthSuccess={handleAuthSuccess} onCloseModal={closeModal} />
      </Modal>

      <Modal isOpen={isSignUpModalVisible} onClose={closeModal}>
        <SignUp onAuthSuccess={handleAuthSuccess} onCloseModal={closeModal} />
      </Modal>
    </>
  );
}

export default Login;
