
import { useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../styles/Accept-invitation.module.css';
import InvitationButton from '../components/invitations/InvitationButton';




const AcceptInvitationPage = () => {
const router = useRouter();

 // Extrait le token, tripId, et potentiellement email de l'URL
  const { token, tripId, email: queryEmail } = router.query;
  const userEmail = useSelector((state) => state.user.value.email);
  const email = queryEmail || userEmail;
  
  
  return (
   <div className={styles.acceptContainer}>
      <div className={styles.titletContainer}>
         <h1 className={styles.acceptTitle} >FellowVoyagers</h1>
         <img src="../images/stickers/globe.png" alt='stickers globe terrestre' className={styles.globe}></img>
      </div>
      
      <p className={styles.acceptText}>Pour accepter l&apos;invitation veuillez vous inscrire ou vous connecter</p>
      <div className={styles.invitationBtn}>
        <InvitationButton/>
      </div>
     
  </div>
);
  } 
export default AcceptInvitationPage;
