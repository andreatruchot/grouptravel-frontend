import React from 'react';
import styles from '../styles/Button.module.css'; // Importe vos styles CSS Modules

function Button({ text, onClick, className = '', style = {} }) {
  // Combine la classe de base avec une classe personnalisée passée en prop

  // et applique les styles en ligne
  return (
    <button 
      className={`${styles.button} ${className}`} // Combine les classes CSS
      style={style} // Applique les styles en ligne
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
