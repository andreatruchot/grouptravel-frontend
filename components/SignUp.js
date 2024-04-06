import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function SignUp({ onCloseModal }) {
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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

    fetch('https://grouptravel-backend-green.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword 
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
      <p className={styles.create}>Créez votre compte sur FellowVoyagers</p>
      <input
          className={styles.input}
          placeholder="Adresse email"
          onChange={(e) => setEmail(e.target.value)} />
      <input
          className={styles.input}
          placeholder="Nom d'utilisateur"
          onChange={(e) => setUsername(e.target.value)} />
          <p className={styles.passwordInfo}>Le mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial.</p>

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

export default SignUp;