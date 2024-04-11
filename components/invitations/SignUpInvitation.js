import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../../styles/SignUpInvitation.module.css';
import InvitationButton from './InvitationButton';
import { login } from '../../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function SignUpInvitation({ onCloseModal }) {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { token } = router.query; // Récupére le token d'invitation de l'URL
  const [showPassword, setShowPassword] = useState(false);



  const handleSignUp = () => {

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
     // Vérification de la force du mot de passe
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
     if (!passwordRegex.test(password)) {
    // Affiche un message d'erreur à l'utilisateur et arrête l'exécution
    console.log("Le mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial.");
    return;
  }


    fetch('https://grouptravel-backend-xi.vercel.app/invitations/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
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
     <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={showPassword ? "text" : "password"}
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)} 
     />
      <button
       className={styles.eyeButton}
       onClick={() => setShowPassword(!showPassword)}
      >
       {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
      </button>
    </div>
    <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      <button className={styles.btnUp} onClick={handleSignUp}>
          Inscription
      </button>
      {showSuccessMessage && <div className={styles.successMessage}>Inscription réussie !</div>}
    </div>
  );
}

export default SignUpInvitation;