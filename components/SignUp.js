// Importation des hooks et fonctions de React, Redux, Next.js et des modules CSS et FontAwesome
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


// Définition du composant fonctionnel SignUp
function SignUp({ onCloseModal }) {

   // Déclaration des états locaux avec useState
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();// Initialisation du hook useDispatch pour accéder au store Redux
  const router = useRouter();// Initialisation du hook useRouter pour la navigation
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  // Fonction de gestion de l'inscription
  const handleSignUp = () => {

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
     // Vérification de la force du mot de passe
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
     if (!passwordRegex.test(password)) {
    // Affiche un message d'erreur à l'utilisateur et arrête l'exécution
    alert("Le mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial.");
    return;
  }
     // Envoi de la requête d'inscription au backend
    fetch('https://grouptravel-backend-xi.vercel.app/users/signup', {
      method: 'POST',
      // Spécifie les en-têtes de la requête, ici on définit que le contenu de la requête est en format JSON
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,// Le nom d'utilisateur saisi par l'utilisateur
        email, // L'adresse email saisie par l'utilisateur
        password,// Le mot de passe saisi par l'utilisateur
        confirmPassword // La confirmation du mot de passe saisie par l'utilisateur
      }),
    })
    // Envoie une requête HTTP au serveur et attend une réponse
    // Le serveur à l'adresse spécifiée gère la création d'un nouvel utilisateur avec les données fournies
    .then((response) => response.json()) // Convertit la réponse du serveur en format JSON
    // Traite les données de la réponse une fois qu'elles sont reçues et converties en JSON
    .then((data) => {
       // Si le serveur renvoie un résultat positif, cela signifie que l'inscription a réussi
      if (data.result) {
        setShowSuccessMessage(true);// Affiche un message de succès
        dispatch(login({ username, email, token: data.token }));// Envoie les informations utilisateur au store Redux
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
      alert("Une erreur s'est produite lors de la tentative de connexion.");// Affiche un message d'erreur
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