import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Ajouté pour l'email
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email, // Ajouté dans le corps de la requête
        password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        dispatch(login({ username, email, token: data.token })); 
        router.push('/'); // Redirection vers la page d'accueil après inscription réussie
        closeModal();
        router.push('/'); 
      } else {
       
        alert('Inscription échouée');
        closeModal();
      }
    })
    .catch((error) => { // Ajoutez ce bloc ici pour gérer les erreurs de la requête fetch
        console.error("Erreur lors de la connexion:", error);
        alert("Une erreur s'est produite lors de la tentative de connexion.");
        closeModal();
      });
    
  };

  const closeModal = () => {
    setUsername('');
    setEmail(''); // Réinitialisation de l'email
    setPassword('');
  };

  return (
    <div className={styles.signUpContainer}>
      <img className={styles.imgLogo} src='../images/bousole.jpg' alt="Logo"/>
      <p className={styles.create}>Créez votre compte sur GroupTravel</p>
      <input
        className={styles.input}
        placeholder="Adresse email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Nom d'utilisateur"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.btnUp} onClick={handleSignUp}>
        inscription
      </button>
    </div>
  );
}

export default SignUp;
