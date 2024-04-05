import React from 'react';
import styles from '../styles/Invitation.module.css'; // Vos styles CSS pour Activites ici
import Header from '../components/Header';
import InvitationForm from "../components/forms/InvitationForm";
import Footer from "../components/Footer"

const InvitationPage = () =>{


    return (
<>
  
     <Header />
   <div className={styles.containerFull}>
     <div className={styles.picture}>
     </div>
     <div className={styles.form}>
       <InvitationForm />
      </div>
      <Footer/>
   </div>
 </>

 );
};


export default InvitationPage;
