
import { useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../styles/Accept-invitation.module.css';
import InvitationButton from '../components/invitations/InvitationButton';


const AcceptInvitationPage = () => {
const router = useRouter();

 // Extraire le token, tripId, et potentiellement email de l'URL
  // Si email n'est pas passé par l'URL, fallback sur celui du state Redux
  const { token, tripId, email: queryEmail } = router.query;
  const email = queryEmail || useSelector((state) => state.user.value.email);
  
  return (
   <div className={styles.acceptContainer}>
      <div className={styles.titletContainer}>
         <h1 className={styles.acceptTitle} >FellowVoyagers</h1>
         <img src="../images/stickers/globe.png" alt='stickers globe terrestre' className={styles.globe}></img>
      </div>
      
      <p className={styles.acceptText}>Pour accepter l'invitation veuillez vous inscrire ou vous connecter</p>
      <div className={styles.invitationBtn}>
        <InvitationButton/>
      </div>
     
  </div>
);
  } 
export default AcceptInvitationPage;
