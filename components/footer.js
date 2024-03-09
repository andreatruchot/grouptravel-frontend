import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/footer.module.css';

export default function Footer() {
  
  

    return (
        <footer className={styles.footer}>
            <div className={styles.footerfull}>
                <Link href="/"><a className={styles.link}>item</a></Link>
                <Link href="/dashboard"><a className={styles.link}>item</a></Link>
                <Link href="/accomodation"><a className={styles.link}>cgv</a></Link>
                <Link href="/activities"><a className={styles.link}>legal</a></Link>
            </div>
        </footer>
    );
}
