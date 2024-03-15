import React from 'react';
import styles from '../styles/Invitation.module.css'; // Vos styles CSS pour Activites ici
import Header from '../components/Header';
import InvitationForm from "../components/forms/InvitationForm";
import Footer from "../components/Footer"

const InvitationPage = () =>{


    return (
<div>
   <div className={styles.header}>
     <Header />
   </div>
   <main className={styles.main}>
     <div className={styles.picture}>
     </div>
     <div className={styles.form}>
       <InvitationForm />
      </div>
   </main>
   <div className={styles.footer}>
    <Footer/>
    </div>
</div>

 );
};


export default InvitationPage;
