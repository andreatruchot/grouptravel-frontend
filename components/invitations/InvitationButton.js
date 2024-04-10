import React, { useState } from 'react';
import Button from '../Button';
import SignUpInvitation from '../invitations/SignUpInvitation';
import LoginInvitation from '../invitations/LoginInvitation';
import Modal from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/user';
import styles from '../../styles/InvitationButton.module.css';

function InvitationButton() {
  const [isLoginInvitationModalVisible, setIsLoginInvitationModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.value.isLoggedIn);

  // Fonction pour gérer l'authentification réussie
  const handleAuthSuccess = (userData) => {
    dispatch(login(userData)); // Dispatche l'action de connexion avec les données de l'utilisateur
    closeModal(); // Ferme toutes les modales
  };

  // Fonction pour fermer toutes les modales
  const closeModal = () => {
    setIsLoginInvitationModalVisible(false);
    setIsSignUpModalVisible(false);
  };

 // Si l'utilisateur est connecté, ne rien afficher
if (isLoggedIn) return null;

  return (
    <div className={styles.buttonInvitation}>
      <Button
        className={styles.btnUp}
        text="Inscription"
        onClick={() => setIsSignUpModalVisible(true)}
      />

      <Button
        className={styles.btnIn}
        text="Connexion"
        onClick={() => setIsLoginInvitationModalVisible(true)}
      />

      <Modal isOpen={isLoginInvitationModalVisible} onClose={closeModal}>
        <LoginInvitation onAuthSuccess={handleAuthSuccess} onCloseModal={closeModal} />
      </Modal>

      <Modal isOpen={isSignUpModalVisible} onClose={closeModal}>
        <SignUpInvitation onAuthSuccess={handleAuthSuccess} onCloseModal={closeModal} />
      </Modal>
    </div>
  );
}

export default InvitationButton;
