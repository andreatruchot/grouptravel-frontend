// Login.js
import React, { useState } from 'react';
import Button from './Button'; 
import SignIn from './SignIn';
import SignUp from './SignUp';
import Modal from './Modal';
import styles from '../styles/Login.module.css';

function Login() {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

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
        <SignIn />
      </Modal>

      <Modal isOpen={isSignUpModalVisible} onClose={() => setIsSignUpModalVisible(false)}>
        <SignUp />
      </Modal>
    </>
  );
}

export default Login;
