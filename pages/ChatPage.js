import React, { useEffect, useState } from 'react';
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
  const [members, setMembers] = useState([]);

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
  
  useEffect(() => {
    const fetchMemberProfiles = async () => {
    
      try {
        const response = await fetch(`https://grouptravel-backend-xi.vercel.app/trips/members/${selectedTripId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch member profiles');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } 
    };

    if (selectedTripId) {
      fetchMemberProfiles();
    }
  }, [selectedTripId]);

  return (
   <div>
     <Header/>
     <div className={styles.ContainerFull}>
        <div className={styles.titleFirst}>
             <img src="../images/stickers/sushis.png" alt='stickers plateau de sushi' className={styles.stickers2}/>
               <h1 className={styles.name}>Chat</h1>
          </div>
          <h2 className={styles.secondTitle}>Ici on discute</h2>
       <div className={styles.ChatContainer}>
           <div className={styles.members}>
            <p className={styles.title}>Membres du groupe</p>
            {members.length > 0 ? (
           <ul className={styles.ulMembers}>
              {members.map((member, index) => (
             <li key={index}className={styles.userList} >
               {member.userPicture && <img className={styles.userPict}src={member.userPicture} alt={member.username} />}
                <p className={styles.userName}>{member.username}</p>
              
            </li>
          ))}
        </ul>
        ) : (
        <p>No members found.</p>
        )}
    
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
