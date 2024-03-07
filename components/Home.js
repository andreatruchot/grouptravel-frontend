import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Header from './header';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { useRouter } from 'next/router';
import Carrousel from './carrousel';


function Home() {
  const router = useRouter(); // Ajoutez cette ligne
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const [isModalVisible, setIsModalVisible] = useState(false);
 

  
  

  const handleNewTripClick = () => {
    if (!isLoggedIn) {
      setIsModalVisible(true);
    } else {
      router.push('/addTrip'); 
    }
  };
  
  return (
    <div>
    <div className={styles.header}>
       <Header />
    </div>
      <main className={styles.main}>
        <div className={styles.banner}>
           <h1 className={styles.title}>
              GroupTravel
           </h1>
           <h2 className={styles.secondtitle}>Planification de votre voyage entre amis</h2>
        </div>
        <div className={styles.newtrip}>
           <img className={styles.plane}></img>
           <button onClick={handleNewTripClick}className={styles.trip}>Nouveau voyage</button>
           <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
            Veillez à vous connecter ou vous inscrire afin de créer un nouveau voyage</Modal>
        </div>
        <div className={styles.howitWorks}>
          <div className={styles.carrousel}>
          <Carrousel />
          </div>
          <img className={styles.stickercase}></img>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Home;
