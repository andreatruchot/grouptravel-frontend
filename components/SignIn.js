import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignIn.module.css';


function SignIn({ onCloseModal }) { // Assurez-vous que onCloseModal est passé en prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = () => {
   
    
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      
      if (data.result) {
        console.log("Connexion réussie");
        dispatch(login({ username: data.username, token: data.token, email: data.email }));
        if(onCloseModal) onCloseModal(); // Utilisez onCloseModal pour fermer la modal
        router.push('/'); // Redirection vers la page d'accueil
      } else {
        alert('Email ou mot de passe invalide');
        if(onCloseModal) onCloseModal(); // Ferme la modal en cas d'erreur aussi
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion:", error);
      alert("Une erreur s'est produite lors de la tentative de connexion.");
      if(onCloseModal) onCloseModal();
    });
  };

  return (
    <div className={styles.signInContainer}>
      <img className={styles.imgLogo} src='../images/stickers/boussole.png' alt="Logo"/>
      <p className={styles.connect}>Connectez-vous à FellowVoyagers</p>
      <input
        className={styles.input}
        placeholder="Adresse email"
        type="email" // Spécifier le type pour activer la validation d'email native du navigateur
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.btnIn} onClick={handleSignIn}>
        Connexion
      </button>
    </div>
  );
}

export default SignIn;
