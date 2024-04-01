import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import { setTrips } from '../reducers/user'; 
import styles from '../styles/ChatPage.module.css';

const ChatPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedTripId, token, tripDetails } = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!selectedTripId) {
      // Si aucun voyage n'est sélectionné, redirigez l'utilisateur.
      console.log('Redirection vers la sélection de voyage');
      router.push('/dashboad'); 
      return;
    }

    if (!tripDetails || tripDetails._id !== selectedTripId) {
      // Dispatch ici l'action pour charger les détails du voyage sélectionné. 
      // À ajuster selon votre implémentation réelle.
      dispatch(setTrips(selectedTripId, token));
    }
  }, [selectedTripId, tripDetails, token, dispatch, router]);
  return (
   <div>
     <Header/>
     <div className={styles.ContainerFull}>
        <div className={styles.ChatContainer}>
           <div className={styles.members}>
            <p className={styles.title}>Membres du groupe</p>
            </div>
             <div className={styles.chat}>
               <Chat /> 
             </div>
          </div>
      </div> 
      <Footer/>
   </div>
  );
};

export default ChatPage;
