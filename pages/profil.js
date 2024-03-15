// pages/addAccommodation.js
import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/userProfile';
import styles from '../styles/Profil.module.css'
import Footer from '../components/Footer';


const profilPage = ({ token, username }) => {
  return (
        <div>
          <Header />
          <div className={styles.profile}>
          <h1 className={styles.title}>Mon profil</h1>
          <img src="../images/stickers/passeport.png" alt='stickers passeport' className={styles.pass}></img> 
        </div>
          <UserProfile token={token} username={username} />
          <Footer/>
        </div>
      );
    };
export default profilPage;
