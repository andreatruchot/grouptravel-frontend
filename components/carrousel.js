import React from "react";
import { UncontrolledCarousel, Row, Col } from "reactstrap";
import styles from '../styles/carrousel.module.css';

const items = [
  {
    src: '/images/home/avant.jpg',
    altText: "Slide 1",
    caption: "",
    header: "",
    key: "1",
  },
  {
    src: '/images/home/apres.jpg',
    altText: "Slide 2",
    caption: "",
    header: "",
    key: "2",
  },
  {
    src: '/images/home/pendant.jpg',
    caption: "",
    header: "",
    key: "3",
  },
];

const Carrousel = () => (
  <div className={styles.carrouselContainer}>
   <Row>
    <Col md="8" className="mx-auto">
      <UncontrolledCarousel items={items} />
    </Col>
    </Row>
  </div>

);

export default Carrousel;