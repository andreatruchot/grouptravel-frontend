import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';


function SignUp({ onCloseModal }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);



  const handleSignUp = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        setShowSuccessMessage(true);
        dispatch(login({ username, email, token: data.token })); 
        setTimeout(() => {
          if(onCloseModal) onCloseModal(); // Utilise onCloseModal pour fermer la modal
          router.push('/'); // Redirection vers la page d'accueil
        }, 3000); // Attendre 3 secondes avant de fermer la modal et rediriger
      } else {
        alert('Inscription échouée');
        if(onCloseModal) onCloseModal(); 
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion:", error);
      alert("Une erreur s'est produite lors de la tentative de connexion.");
      if(onCloseModal) onCloseModal();
    });
  };
  return (
    <div className={styles.signUpContainer}>
      <img className={styles.imgLogo} src='../images/stickers/vanvw.png' alt="Logo" />
      <p className={styles.create}>Créez votre compte sur GroupTravel</p>
      <input
          className={styles.input}
          placeholder="Adresse email"
          onChange={(e) => setEmail(e.target.value)} />
      <input
          className={styles.input}
          placeholder="Nom d'utilisateur"
          onChange={(e) => setUsername(e.target.value)} />
      <input
          className={styles.input}
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)} />
      <button className={styles.btnUp} onClick={handleSignUp}>
          Inscription
      </button>
      {showSuccessMessage && <div className={styles.successMessage}>Inscription réussie !</div>}
    </div>
  );
}

export default SignUp;