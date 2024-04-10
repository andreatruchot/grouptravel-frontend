// pages/addAccommodation.js
import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/userProfile';
import styles from '../styles/Profil.module.css'
import Footer from '../components/Footer';


const profilPage = ({ token, username }) => {
  return (
        <div className={styles.pageContainer}>
          <Header />
          <div className={styles.containerFull}>
             <div className={styles.profile}>
              <div className={styles.titleContainer}>
                <img src="../images/stickers/passeport.png" alt='stickers passeport' className={styles.pass}/> 
                <h1 className={styles.title}>Mon profil</h1>
                </div>
            </div>
          <UserProfile token={token} username={username} />
          </div>
          <Footer/>
        </div>
      );
    };
export default profilPage;
