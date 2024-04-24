import React from 'react';
import styles from '../styles/Credits.module.css'; 

function Credits() {
  return (
  <section className={styles.creditsContainer}>
      <h1 className={styles.header}>Crédits</h1>
      <div className={styles.section}>
        <h2 className={styles.title}>Maquette Figma & Design Graphique</h2>
        <p className={styles.name}>Andréa Truchot</p>
        <p>Conçue avec une attention particulière pour les détails et l'expérience utilisateur, reflétant un engagement envers une interface utilisateur esthétique et fonctionnelle.</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Développement Front-End et Back-End</h2>
        <p className={styles.name}>Andréa Truchot</p>
        <p>Développée pour assurer une performance optimale et une navigation fluide. Expertise en développement fullstack pour applications web et mobiles.</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Conception Web</h2>
        <p className={styles.name}>Andréa Truchot, Conceptrice Développeuse Web Fullstack</p>
        <p>Spécialisée dans la conception d'interfaces et d'expériences utilisateurs digitales, avec un focus sur la création de solutions intégrées et innovantes.</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Illustration & Dessin</h2>
        <p className={styles.name}>Mathurin Hertzmann, Illustrateur</p>
        <p>Apporte une touche artistique unique au projet à travers des illustrations qui captent l'essence visuelle de la conception.</p>
      </div>
    </section>
  );
}

export default Credits;
