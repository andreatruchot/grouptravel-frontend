import Link from "next/link";
import Login from './login';
import { useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import styles from '../styles/header.module.css';

export default function Header() {
    const user = useSelector(state => state.user.value);
    
    const handleLogout = () => {
        dispatch(logout()); // Dispatch l'action de déconnexion
    };
    return (
        <header className={styles.header}>
            <div className={styles.headerfull}>
                <Link href="/"><a className={styles.link}>Mes groupes</a></Link>
                <Link href="/dashboard"><a className={styles.link}>Tableau de bord</a></Link>
                <Link href="/accomodation"><a className={styles.link}>Hébergement</a></Link>
                <Link href="/activities"><a className={styles.link}>Activités</a></Link>
                <Link href="/planning"><a className={styles.link}>Planning</a></Link>
                <Link href="/chat"><a className={styles.link}>Chat</a></Link>
                {user.token && <span className={styles.onLine}> {user.username}</span>} 
                <button onClick={handleLogout} className={styles.logoutButton}>Déconnexion</button>
            </div>
            <div className={styles.log}>
               <Login />
            </div>
        </header>
    );
}
