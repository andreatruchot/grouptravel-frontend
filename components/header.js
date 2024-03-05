import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Login from './login';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore } from '../reducers/user';
import styles from '../styles/header.module.css';

export default function Header() {
    const dispatch = useDispatch();
    const addUser = (newUser) => {
        dispatch(addUserToStore(newUser));
    }
    const user = useSelector((state) => state.user);

    const icon = {
        name: faHouse,
        classname: 'header-icon',
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerfull}>
                <Link href="/"><a className={styles.link}>Home</a></Link>
                <Link href="/dashboard"><a className={styles.link}>Dashboard</a></Link>
                <Link href="/accomodation"><a className={styles.link}>Accomodation</a></Link>
                <Link href="/activities"><a className={styles.link}>Activities</a></Link>
                <Link href="/planning"><a className={styles.link}>Planning</a></Link>
                <Link href="/chat"><a className={styles.link}>Chat</a></Link>
               <Login/>
                {user ? user.userName : ''}
            </div>
        </header>
    );
}
