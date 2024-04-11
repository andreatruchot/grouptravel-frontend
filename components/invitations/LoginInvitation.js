import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../../styles/LoginInvitation.module.css';
import { login } from '../../reducers/user';



function LoginInvitation({ onCloseModal }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogin = () => {
    fetch('https://grouptravel-backend-xi.vercel.app/invitations/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, token}),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Réponse du serveur:", data);
      if (data.success) {
        setShowSuccessMessage(true);
        dispatch(login({ email, token: data.token, username: data.username }));

        setTimeout(() => {
          if (onCloseModal) onCloseModal(); // Ferme la modal si nécessaire
          router.push('/'); // Redirige vers la page d'accueil
        }, 2000);
      } else {
        // Gère le cas où `data.success` est `false`.
        alert("La connexion a échoué. Veuillez vérifier vos identifiants.");
        if (onCloseModal) onCloseModal();
      }
    })
    .catch(error => {
      console.error("Erreur lors de l'inscription:", error);
      alert(error.message);
      if (onCloseModal) onCloseModal();
    });
  };
  
  return (
    <div className={styles.signInContainer}>
      <img className={styles.imgLogo} src='../images/stickers/boussole.png' alt="Logo"/>
      <p className={styles.connect}>Connectez-vous à FellowVoyagers</p>
      <input
        className={styles.input}
        placeholder="Adresse email"
        type="email"
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
      <button className={styles.btnIn} onClick={handleLogin}>
        Connexion
      </button>
      {showSuccessMessage && <div className={styles.successMessage}>Connexion réussie !</div>}
    </div>
  );
}

export default LoginInvitation;
