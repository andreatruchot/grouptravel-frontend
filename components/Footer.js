import Link from "next/link";
import styles from '../styles/Footer.module.css';

export default function Footer() {
  
    return (
        <footer className={styles.footer}>
                <Link href="/Legals"><a className={styles.link}>Mentions Légales</a></Link>
                <Link href="/Credits"><a className={styles.link}>Crédits</a></Link>
        </footer>
    );
}
