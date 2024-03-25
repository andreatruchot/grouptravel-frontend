
import React from 'react';
import '../styles/Alert.module.css'; 

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Alert;
