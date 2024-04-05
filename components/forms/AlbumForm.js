import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ImageUpload from '../../components/ImageUpload'; 
import styles from '../../styles/AlbumForm.module.css'

const AlbumForm = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const router = useRouter();
  const tripId = useSelector(state => state.user.value.selectedTripId);
  const token = useSelector(state => state.user.value.token);

  const onFileSelect = (file) => {
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      setError("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('description', description);
    formData.append('tripId', tripId);

    try {
      const response = await fetch('http://localhost:3000/tripPictures/addPicture', { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload the picture");

      const result = await response.json();
      alert("Photo téléchargée avec succes!");

      setDescription('');
      setPhoto(null);
      setError('');
       
    } catch (error) {
      setError(error.message || "An error occurred while uploading the picture.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ImageUpload onFileSelect={onFileSelect} buttonClassName={styles.customButtonStyle} />
      <textarea  className={styles.what} 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Une légende pour la photo"
      />
      {error && <div className="error">{error}</div>}
      <button className={styles.submit} type="submit">soumettre</button>
    </form>
  );
};

export default AlbumForm;
