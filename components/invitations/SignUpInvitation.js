import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../../styles/SignUpInvitation.module.css';
import InvitationButton from './InvitationButton';
import { login } from '../../reducers/user';


function SignUp({ onCloseModal }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { token } = router.query; // Récupére le token d'invitation de l'URL



  const handleSignUp = () => {
    fetch('http://localhost:3000/invitations/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        token,
      }),
    })
    .then((response) => response.json())
    .then(data => {
        if (data.success) {
            setShowSuccessMessage(true);
            dispatch(login({ 
              username, email, token: data.token 
            }));
            setTimeout(() => {
                if (onCloseModal) onCloseModal(); // Ferme la modal si nécessaire
                router.push('/'); // Redirige vers la page d'accueil
            }, 2000);
        } else {
            // Gére le cas où le serveur a traité la requête mais indique un problème avec les données.
            throw new Error('Inscription échouée');
        }
    })
    .catch(error => {
        // Ici, on attrape à la fois les erreurs réseau et les erreurs lancées manuellement dans les `.then()`.
        console.error("Erreur lors de l'inscription:", error);
        alert(error.message);
        if (onCloseModal) onCloseModal();
    });
};
  return (
    <div className={styles.signUpContainer}>
      <img className={styles.imgLogo} src='../images/stickers/jeep.png' alt="stickers de jeep" />
      <p className={styles.create}>Créez votre compte sur FellowVoyagers</p>
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