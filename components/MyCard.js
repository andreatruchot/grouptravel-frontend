import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';



const MyCard = (props) => {

  
    const { imageUrl, title, subtitle, content, children, 
      budget, date, onVote,  voteCount, arrivalDate, participationCount, returnDate, 
      showVoteButtons = true, showDeleteButton = false, onDelete, 
      additionalStyles = {}, cardBodyStyle = {}, showDates = false, showParticipationCount = false, showVoteCount = false, isAdmin, linkUrl } = props;
  
    const [voted, setVoted] = useState(null);
    const [isContentExpanded, setContentExpanded] = useState(false); 

    const handleVote = (status) => {
      // Appele la fonction onVote avec le statut du vote
      onVote(status);
      // Met à jour l'état ici pour refléter le changement
      setVoted(status ? 'yes' : 'no');
      alert("Votre participation a été enregistrée.");
  };
  // Fonction pour tronquer le texte
  const truncateContent = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Gestion du clic pour étendre le contenu
  const toggleContent = () => {
    setContentExpanded(!isContentExpanded);
  };

    return (
      <div style={additionalStyles} className={styles.cardContainer}>
      <Card className={styles.card }>
          {imageUrl && <img src={imageUrl} alt="Card image" className={styles.cardImage} />}
          <CardBody style={cardBodyStyle}>
              {title && <CardTitle tag="h5">{title}</CardTitle>}
              {subtitle && <CardSubtitle className="text-muted" tag="h6">{subtitle}</CardSubtitle>}
              { linkUrl&& (
               <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                Plus d'infos
                   </a>
                   )}
              <CardText>
              {isContentExpanded ? content : truncateContent(content, 100)}
              <Button className={styles.seeButtons} onClick={toggleContent} >
                {isContentExpanded ? 'Voir moins' : 'Voir plus'}
              </Button>
            </CardText>
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
               {showDeleteButton && <Button className={styles.deleteButtons} onClick={() => onDelete(props.id)}> Supprimer</Button>}
              </div>
          </CardBody>
      </Card>
  </div>
    );
  }
  
  export default MyCard;

   
