import React, { useEffect, useState, useContext } from 'react';
import LoggedIn from '../components/LoginContext';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import unavailableImg from '../images/unavailable-image.jpg';
import SaveIconButton from '../components/SaveIconButton';
import UnSaveIconButton from '../components/UnSaveIconButton';
import EmailIconButton from '../components/EmailIconButton';

//import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/HouseDetailPage.css';

const HouseDetailPage = () => {
  const { loggedIn } = useContext(LoggedIn);
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);
  const [saved, setSaved] = useState(false);

  const fetchHouse = async () => {
    const houseResp = await fetch(`/houses/by_id/${houseId}`);
    const houseRespJson = await houseResp.json();
    setHouse(houseRespJson['house']);

    if (loggedIn.loggedIn) {
      const watchResp = await fetch(`/watch/check/${houseId}`);
      const watchRespJson = await watchResp.json();
      setSaved(watchRespJson['saved']);
    } else {
      setSaved(false);
    }
  };

  const parseHouseImages = (imgs) => {
    if (imgs.length === 0) {
      return [unavailableImg];
    } else {
      return imgs;
    }
  };

  useEffect(fetchHouse, [loggedIn]);

  if (house) {
    return (
      <main>
        <Container>
          <Row className="justify-content-center">
            <h1 className="house-title m-5">
              {house['result-title']} - ${house['result-price']}/month{' '}
            </h1>
          </Row>
          <Row>
            <Col xs={1}>
              {saved ? (
                <UnSaveIconButton onSave={setSaved} houseId={houseId} />
              ) : (
                <SaveIconButton onSave={setSaved} houseId={houseId} />
              )}
              <hr></hr>
              {<EmailIconButton />}
            </Col>
            <Col xs={6}>
              <AliceCarousel disableSlideInfo={false} disableDotsControls>
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
            </Col>
            <Col xs={4}>
              <h2>some other shit</h2>
            </Col>
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
