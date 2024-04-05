import Link from "next/link";
import Login from './Login';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';


export default function Header() {
    const user = useSelector(state => state.user.value);
    const isLoggedIn = useSelector(state => state.user.value.isLoggedIn);
    const dispatch = useDispatch();
    const router = useRouter();
    const selectedTripId = useSelector(state => state.user.value.selectedTripId);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    
    const handleLogout = () => {
        dispatch(logout()); // Dispatch l'action de déconnexion
        router.push('/'); // Redirige vers la page d'accueil après la déconnexion
    };
   // Fonction pour basculer la visibilité du menu
   const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};
    return (
        // selectedTripId et isLoggedIN pour l'affichage conditionnel du menu et de l'onglet tableau de bord
     <header className={styles.container}>
        <div className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
            <h2 className={styles.logo}>FellowVoyagers</h2>
            <button onClick={toggleMenu} className={styles.burgerMenu} aria-expanded={isMenuOpen}>☰</button>
            <div className={`${isMenuOpen ? styles.showMenu : 'hidden'}`}>
            {isLoggedIn &&<ul className={styles.login}>
               <li className={styles.li}><Link href="/"><a className={styles.link}>Accueil</a></Link></li>  
                <li><Link href="/Profil"><a className={styles.link}>Mon profil</a></Link></li>
                {selectedTripId && <li><Link href="/Dashboard"><a className={styles.link}>Tableau de bord</a></Link></li>}
            <li>{user.token && <span className={styles.onLine}>Bonjour, {user.username}</span>}</li> 
            <li><button onClick={handleLogout} className={styles.logoutButton}>Déconnexion</button></li>
             </ul>}
            <ul className={styles.logout}>
             <li><Login /></li> 
            </ul>
         </div>
        </div>
     </header>
    );
}
