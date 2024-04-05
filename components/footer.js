import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  
    return (
        <footer className={styles.footer}>
                <Link href=""><a className={styles.link}>Mentions Légales</a></Link>
                <Link href=""><a className={styles.link}>Crédits</a></Link>
        </footer>
    );
}
