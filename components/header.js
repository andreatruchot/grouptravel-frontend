import Link from "next/link";
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';

export default function Header() {
    const user = useSelector(state => state.user.value);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const router = useRouter(); 
    
    const handleLogout = () => {
        dispatch(logout()); // Dispatch l'action de déconnexion
        router.push('/'); // Redirige vers la page d'accueil après la déconnexion
    };
    return (
        <header className={styles.container}>
           
            <div className={styles.headerfull}>
            {isLoggedIn && <>
                <Link href="/"><a className={styles.link}>Mon profil</a></Link>
                <Link href="/dashboard"><a className={styles.link}>Tableau de bord</a></Link>
                <Link href="/accomodation"><a className={styles.link}>Hébergement</a></Link>
                <Link href="/activities"><a className={styles.link}>Activités</a></Link>
                <Link href="/planning"><a className={styles.link}>Planning</a></Link>
                <Link href="/chat"><a className={styles.link}>Chat</a></Link>
                <button onClick={handleLogout} className={styles.logoutButton}>Déconnexion</button>
            {user.token && <span className={styles.onLine}> {user.username}</span>} 
             </>}
            </div>
           
             <div className={styles.headerlog}>
             <Login />
            </div>
        </header>
    );
}
