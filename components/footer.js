import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  
    return (
        <footer className={styles.footer}>
            <div className={styles.footerfull}>
                <Link href="/"><a className={styles.link}>item</a></Link>
                <Link href="/Dashboard"><a className={styles.link}>item</a></Link>
                <Link href="/Accomodation"><a className={styles.link}>cgv</a></Link>
                <Link href="/Activities"><a className={styles.link}>legal</a></Link>
            </div>
        </footer>
    );
}
