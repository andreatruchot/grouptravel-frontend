import styles from '../styles/Home.module.css';
import Header from './header';


function Home() {
  return (
    <div>
       <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          GroupTravel
        </h1>
        <h2 className={styles.secondtitle}>Planification de votre voyage entre amis</h2>
      </main>
    </div>
  );
}

export default Home;
