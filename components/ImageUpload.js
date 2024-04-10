// ImageUpload.js
import React, { useState } from 'react';
import styles from '../styles/ImageUpload.module.css';
import Image from 'next/image'; 

const ImageUpload = ({ onFileSelect, buttonClassName }) => {
  const [previewUrl, setPreviewUrl] = useState('');


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <div className={styles.previewContainer}>
        {previewUrl ? (
          <Image src={previewUrl} alt="Preview" className={styles.previewImage} />
        ) : (
          <div className={styles.placeholder}>
            <i className="fas fa-camera"></i>
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          id="file"
          type="file"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        <label htmlFor="file" className={`${styles.fileLabel} ${buttonClassName}`}>
          Ajouter une photo
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
