import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignIn.module.css'; 

function SignIn() {
  const [email, setEmail] = useState(''); // Utilisation de l'email pour l'authentification
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = () => {
    console.log("Tentative de connexion");
    // Validation simple pour s'assurer que les champs ne sont pas vides
    if (!email || !password) {
      alert('Les champs ne doivent pas être vides'); // Utilisation d'alert pour simplifier
      return;
    } else {
      console.log("Envoi de la requête:", email, password);
      fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, // Mise à jour pour utiliser email
          password,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: data.username, token: data.token })); // Mise à jour selon ce que votre API retourne
          closeModal();
          //utilisation du userRouter de next pour créer le chemin de redirection si on reçoit les data
          router.push('/');
        } else {

          alert('mot de passe ou email invalide');
          closeModal();
        }
      });
    
    };
    }
  const closeModal = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.signInContainer}>
      <img className={styles.imgLogo} src='../images/stickers/boussole.png' alt="Logo"/>
      <p className={styles.connect}>Connectez-vous à GroupTravel</p>
      <input
        className={styles.input}
        placeholder="Adresse email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.btnIn} onClick={handleSignIn}>
        connection
      </button>
    </div>
  );
}

export default SignIn;
