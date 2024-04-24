import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Login from './Login';
import { logout, setToken } from '../reducers/user'; 

export default function Header() {
    const { isLoggedIn, selectedTripId, username, token } = useSelector(state => state.user.value);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector(state => state.user.value);
   
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token'); // Nettoye le token stocké lors de la déconnexion
        router.push('/');
    };

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
             {selectedTripId && <li><Link href="/Dashboard"><a className={styles.link}>Voyage</a></Link></li>}
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
