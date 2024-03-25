import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';





// Renommez le composant pour éviter les conflits avec l'importation de Card de reactstrap
const MyCard = (props) => {

  
    const { imageUrl, title, subtitle, content, children, budget, date, onVote} = props;
    const [voted, setVoted] = useState(null); 

    const handleVote = (status) => {
      const voteStatus = status;
      // Appeler la fonction onVote avec le statut du vote
      onVote(voteStatus);
      // Mettre à jour l'état ici pour refléter le changement
      setVoted(status ? 'yes' : 'no');
      alert("Votre participation a été enregistrée.");
  };
    return (
      <div className={styles.cardContainer}>
      <Card className={styles.card}>
          {imageUrl && <img src={imageUrl} alt="Card image" className={styles.cardImage} />}
          <CardBody>
              {title && <CardTitle tag="h5">{title}</CardTitle>}
              {subtitle && <CardSubtitle className="text-muted" tag="h6">{subtitle}</CardSubtitle>}
              {content && <CardText>{content}</CardText>}
              {children &&<CardText>{date}</CardText>}
              {children &&<CardText>{date}</CardText>}
              {budget && <CardText>Budget: {budget}€</CardText>}
              {props.isAdmin && <Button onClick={() => props.onSelectFixed(props.id, true)}>Fixer</Button>}
              <div className={styles.voteButtons}>
                
              <Button className={voted === 'yes' ? styles.voteButtonActiveY : styles.voteButtonY} onClick={() => handleVote(true)}>
                  <FontAwesomeIcon icon={faCircleCheck}/> ok
                </Button>
                <Button className={voted === 'no' ? styles.voteButtonActiveN : styles.voteButtonN}
                        onClick={() => handleVote(false)}>
                  <FontAwesomeIcon icon={faCircleXmark}/> sans moi
                </Button>
            </div>
          </CardBody>
      </Card>
  </div>
    );
  }
  
  export default MyCard;

   
