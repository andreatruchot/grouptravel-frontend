import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';


// Renommez le composant pour éviter les conflits avec l'importation de Card de reactstrap
const MyCard = (props) => {

  
    const { imageUrl, title, subtitle, content, children, 
      budget, date, onVote,  voteCount, arrivalDate, participationCount, returnDate, 
      showVoteButtons = true, showDeleteButton = false, onDelete, 
      additionalStyles = {}, cardBodyStyle = {}, showDates = false, showParticipationCount = false, showVoteCount = false, isAdmin } = props;
  
    const [voted, setVoted] = useState(null); 

    const handleVote = (status) => {
      // Appeler la fonction onVote avec le statut du vote
      onVote(status);
      // Mettre à jour l'état ici pour refléter le changement
      setVoted(status ? 'yes' : 'no');
      alert("Votre participation a été enregistrée.");
  };
    return (
      <div style={additionalStyles} className={styles.cardContainer}>
      <Card className={styles.card }>
          {imageUrl && <img src={imageUrl} alt="Card image" className={styles.cardImage} />}
          <CardBody style={cardBodyStyle}>
              {title && <CardTitle tag="h5">{title}</CardTitle>}
              {subtitle && <CardSubtitle className="text-muted" tag="h6">{subtitle}</CardSubtitle>}
              {content && <CardText>{content}</CardText>}
              {children &&<CardText>{date}</CardText>}
              {children &&<CardText>{date}</CardText>}
              {showDates && date && <CardText>{date}</CardText>}
              {showDates && arrivalDate && <CardText>Arrivée: {arrivalDate}</CardText>} 
              {showDates && returnDate && <CardText>Départ: {returnDate}</CardText>} 
              {showParticipationCount && <CardText>Participants: {participationCount}</CardText>}
              {showVoteCount && <CardText>vote: {voteCount}</CardText>}
              {budget && <CardText>Budget: {budget}€</CardText>}
              {props.isAdmin && <Button className={styles.fixedButtons} onClick={() => props.onSelectFixed(props.id, true)}>Fixer</Button>}
              {showVoteButtons && (
              <div className={styles.voteButtons}>
              <Button className={voted === 'yes' ? styles.voteButtonActiveY : styles.voteButtonY} onClick={() => handleVote(true)}>
                  <FontAwesomeIcon icon={faCircleCheck}/> ok
                </Button> 
                <Button className={voted === 'no' ? styles.voteButtonActiveN : styles.voteButtonN}
                        onClick={() => handleVote(false)}>
                 <FontAwesomeIcon icon={faCircleXmark}/> sans moi
                </Button>
            </div>
           
              )}
               <div className={styles.deleteContainer}>
               {showDeleteButton && <Button className={styles.deleteButtons} onClick={() => onDelete(props.id)}><FontAwesomeIcon icon={faTrash} /> Supprimer</Button>}
              </div>
          </CardBody>
      </Card>
  </div>
    );
  }
  
  export default MyCard;

   
