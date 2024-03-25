import Link from "next/link";
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';


export default function Header() {
    const user = useSelector(state => state.user.value);
    const isLoggedIn = useSelector(state => state.user.value.isLoggedIn);
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
                <h2>FellowVoyagers</h2>
                <Link href="/"><a className={styles.link}>Accueil</a></Link>  
                <Link href="/Profil"><a className={styles.link}>Mon profil</a></Link>
                
            {user.token && <span className={styles.onLine}>Bonjour, {user.username}</span>} 
            <button onClick={handleLogout} className={styles.logoutButton}>Déconnexion</button>
             </>}
             <Login />
        </div>
     </header>
    );
}
