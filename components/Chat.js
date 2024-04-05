import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChat, addMessageToChat } from '../reducers/user';
import styles from '../styles/chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


// Liste de couleurs pour les utilisateurs
const userColors = [
  "#BDDCD7",
  "#EBD5C8",
  "#DADBC2", 
  "#F7E29D", 
  "#COCDC2", 
  "#ECB7B8", 
  "#EED271", 
  "#DADBC2",
  "#D9D8D3", 
  "#EFD6C7",
  "#A1C5C8",
];


const Chat = () => {
  const dispatch = useDispatch();
  const { token, tripDetails } = useSelector((state) => state.user.value);
  const [messageText, setMessageText] = useState('');
  const [userColorMap, setUserColorMap] = useState({});
  const { userId } = useSelector((state) => state.user.value);

  const loadChat = async () => {
    if (token && tripDetails._id) {
      const response = await fetch(`http://localhost:3000/chats/chat/${tripDetails._id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setChat(data)); // Met à jour le chat dans l'état Redux
      } else {
        console.error('Erreur lors du chargement du chat');
      }
    }
  };

  useEffect(() => {
    loadChat();
  }, [tripDetails._id, token, dispatch]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (token && tripDetails._id && messageText.trim()) {
      const response = await fetch(`http://localhost:3000/chats/chat/${tripDetails._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        dispatch(addMessageToChat(newMessage)); // Ajoute le nouveau message au chat dans l'état Redux
        setMessageText('');
      } else {
        console.error('Erreur lors de l’envoi du message');
      }
    }
  };
  const getColorForUsername = (username) => {
    if (!userColorMap[username]) {
      const colorIndex = Object.keys(userColorMap).length % userColors.length;
      const newUserColorMap = { ...userColorMap, [username]: userColors[colorIndex] };
      setUserColorMap(newUserColorMap);
      return userColors[colorIndex];
    }
    return userColorMap[username];
  };
  const deleteChatMessage = async (tripId, chatId) => {
    try {
      const response = await fetch(`http://localhost:3000/chats/chat/${tripId}/${chatId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const message = `Une erreur est survenue: ${response.status}`;
        throw new Error(message);
      }
  
      const data = await response.json();
      console.log(data.message); // "Message supprimé avec succès."
      // Mettre à jour l'état du chat ici si nécessaire, par exemple avec une action Redux ou un useState
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
    }
  };
  
  return (
  <div>
    <div>
      <div className={styles.container}>
      <div className={styles.message}>
        <ul className={styles.ulstyle}>
           {tripDetails.chat && tripDetails.chat.map((chatItem) => {
            const color = getColorForUsername(chatItem.author.username);
             const isAuthor = userId === chatItem.author._id.toString(); // Assurez-vous que cette comparaison fonctionne comme prévu

             return (
              <li key={chatItem._id} style={{ backgroundColor: color }} className={styles.listStyle}>
                 {chatItem.author.username}: {chatItem.message}
                 {isAuthor && (
                  <span
                     className={styles.deleteIcon}
                     onClick={() => deleteChatMessage(tripDetails._id, chatItem._id)}
                    >X</span>
                 )}
              </li>
              );
             })}
           </ul>
        </div>
      </div>
   </div>
    <form className={styles.form}onSubmit={sendMessage}>
    <div className={styles.btnMessage}>
      <textarea
      className={styles.messageText}
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
         placeholder="Écrire un message..."
     />
     <button className={styles.btn} type="submit">Envoyer</button>
    </div>
   </form>
 </div>
  );
};


export default Chat;
