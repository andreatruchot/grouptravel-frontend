import Header from '../components/Header';
import Footer from '../components/Footer';
import AlbumForm from '../components/forms/AlbumForm';
import styles from '../styles/AddPictures.module.css'
import { useRouter } from 'next/router';


const AddPictures = () => {


    
return (
<div>
  <Header/>
   <div className={styles.containerFull}>
   <img src="../images/stickers/appphot.png" alt='stickers appareil photo' className={styles.stickers2}/>
      <div className={styles.title}>
        <p className={styles.subtitle}>Là on ajoute les photos du voyage</p>
      </div>
    <div className={styles.picture}>
       <AlbumForm/>
    </div>
    <Footer/>
 </div>
</div>
)
}
export default AddPictures;