import React, { Component } from 'react';
import styles from '../styles/legals.module.css'

class Legals extends Component {
  render() {
    return (
      <div className={styles.legalsContainer}>
      <h1 className={styles.legalsHeader}>Mentions légales</h1>

      <div className={styles.legalsSection}>
        <h2 className={styles.legalsHeader}>1. Éditeur du site</h2>
        <p>Nom : Andréa Truchot</p>
        <p>Adresse : 1 rue des maroux 36200 Argenton sur Creuse</p>
        <p>Email : andrea.truchot@yahoo.com</p>
      </div>

      <div className={styles.legalsSection}>
        <h2 className={styles.legalsHeader}>2. Hébergeur</h2>
        <p>Le site est hébergé par Vercel Inc.</p>
        <p>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
        <p>Site web : <a className={styles.legalsLink} href="https://vercel.com">https://vercel.com</a></p>
      </div>

      <div className={styles.legalsSection}>
        <h2 className={styles.legalsHeader}>3. Protection et traitement des données personnelles</h2>
        <p>Les informations personnelles collectées par le biais du formulaire de contact sont principalement utilisées pour permettre l'établissement d'une communication répondant à la demande de l'utilisateur. Ces données comprennent des informations telles que le nom, l'adresse email et le contenu du message. Elles sont traitées avec l'assistance de Bravo, utilisé pour le système de réponse automatique, et sont supprimées immédiatement après le traitement de la demande.</p>
        <p>Le site utilise un token CSRF pour protéger contre les attaques de type Cross-Site Request Forgery. Un cookie de session est également utilisé uniquement pour maintenir la session utilisateur lors de la navigation sur le site.</p>
      </div>

      <div className={styles.legalsSection}>
        <h2 className={styles.legalsHeader}>4. Cookies</h2>
        <p>Un cookie de session est utilisé pour gérer votre session utilisateur. Ce cookie est essentiel pour le fonctionnement du formulaire de contact et expire automatiquement à la fin de la session.</p>
      </div>

      <div className={styles.legalsSection}>
        <h2 className={styles.legalsHeader}>5. Propriété intellectuelle</h2>
        <p>Le contenu de ce site, incluant mais non limité aux textes, images, design graphique et code source, est protégé par le droit d'auteur et appartient exclusivement à Andréa Truchot. Toute reproduction, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'accord préalable écrit de l'éditeur.</p>
      </div>
    </div>
  );
};
    
  }

export default Legals;