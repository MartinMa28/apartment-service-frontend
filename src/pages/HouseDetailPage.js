import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import unavailableImg from '../images/unavailable-image.jpg';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/HouseDetailPage.css';

const HouseDetailPage = () => {
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);

  const fetchHouse = async () => {
    const resp = await fetch(`/houses/by_id/${houseId}`);
    const respJson = await resp.json();

    setHouse(respJson['house']);
  };

  const parseHouseImages = (imgs) => {
    if (imgs.length === 0) {
      return [unavailableImg];
    } else {
      return imgs;
    }
  };

  useEffect(fetchHouse, []);

  if (house) {
    return (
      <main>
        <Container>
          <Row className="justify-content-center">
            <h1>
              {house['result-title']} - ${house['result-price']}/month{' '}
            </h1>
          </Row>
          <Row>
            <AliceCarousel
              autoWidth
              disableSlideInfo={false}
              disableButtonsControls
            >
              {parseHouseImages(house['images']).map((img, idx) => (
                <img
                  key={idx.toString()}
                  src={img}
                  onError={(evt) => {
                    evt.target.onerror = null;
                    evt.target.src = unavailableImg;
                  }}
                  className="house-detail-img"
                />
              ))}
            </AliceCarousel>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{ __html: house['postingbody'] }} />
          </Row>
        </Container>
      </main>
    );
  } else {
    return <main></main>;
  }
};

export default HouseDetailPage;
