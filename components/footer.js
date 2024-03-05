import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore } from '../reducers/user';
import styles from '../styles/header.module.css';

export default function Footer() {
    const dispatch = useDispatch();
    //const addUser = (newUser) => {
       // dispatch(addUserToStore(newUser));
    //}
    const user = useSelector((state) => state.user);

    return (
        <header className={styles.header}>
            <div className={styles.headerfull}>
                <Link href="/"><a className={styles.link}>item</a></Link>
                <Link href="/dashboard"><a className={styles.link}>item</a></Link>
                <Link href="/accomodation"><a className={styles.link}>cgv</a></Link>
                <Link href="/activities"><a className={styles.link}>legal</a></Link>
                {user ? user.userName : ''}
            </div>
        </header>
    );
}
