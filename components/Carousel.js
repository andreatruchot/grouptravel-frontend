import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from '../styles/carousel.module.css'




function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className={styles.customCarousel}activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className={styles.carouselItem}>
         <img src="/images/avant.jpg" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item className={styles.carouselItem}> 
       <img src="/images/pendant.jpg" alt="Second slide" /> 
      </Carousel.Item>
      <Carousel.Item className={styles.carouselItem}>
        <img src="/images/apres.jpg" alt="Second slide" /> 
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;