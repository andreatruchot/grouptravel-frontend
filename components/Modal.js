// components/Modal.js
import React from 'react';
import styles from '../styles/Modal.module.css'; 

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
