import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Login from './login';
import { useSelector } from 'react-redux';
import styles from '../styles/header.module.css';

export default function Header() {
    const user = useSelector(state => state.user.value);
    
    
   
    return (
        <header className={styles.header}>
            <div className={styles.headerfull}>
                <Link href="/"><a className={styles.link}>Home</a></Link>
                <Link href="/dashboard"><a className={styles.link}>Dashboard</a></Link>
                <Link href="/accomodation"><a className={styles.link}>Accomodation</a></Link>
                <Link href="/activities"><a className={styles.link}>Activities</a></Link>
                <Link href="/planning"><a className={styles.link}>Planning</a></Link>
                <Link href="/chat"><a className={styles.link}>Chat</a></Link>
                {user.token && <span>Bonjour, {user.userName}</span>}
            </div>
            <div className={styles.log}>
               <Login/>
            </div>
        </header>
    );

    }