import React, { useEffect, useState, useContext } from 'react';
import LoggedIn from '../components/LoginContext';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import unavailableImg from '../images/unavailable-image.jpg';
import SaveIconButton from '../components/SaveIconButton';
import UnSaveIconButton from '../components/UnSaveIconButton';
import EmailIconButton from '../components/EmailIconButton';

import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/HouseDetailPage.css';

const HouseDetailPage = () => {
  const { loggedIn } = useContext(LoggedIn);
  const { houseId } = useParams();
  const [alertMsg, setAlertMsg] = useState('');
  const [cheaperAptUrl, setCheaperAptUrl] = useState(null);
  const [house, setHouse] = useState(null);
  const [saved, setSaved] = useState(false);
  const location = useLocation();

  const handleEvents = () => {
    if (loggedIn.loggedIn) {
      const events = new EventSource('/events');
      events.onmessage = (event) => {
        const { message, apartmentId } = JSON.parse(event.data);
        console.log(message);
        console.log(apartmentId);
        if (apartmentId) {
          setAlertMsg(message);
          setCheaperAptUrl('/house-detail/' + apartmentId);
          console.log('/house-detail/' + apartmentId);
        }
      };
    }
  };

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

  useEffect(() => {
    fetchHouse();
    handleEvents();
  }, [loggedIn, location.pathname]);

  if (house) {
    return (
      <main>
        <Container>
          <Row className="justify-content-center">
            <h1 className="house-title m-5">
              {house['result-title']} - ${house['result-price']}/month{' '}
            </h1>
          </Row>
          <Row className="d-flex flex-row-reverse">
            {alertMsg !== '' ? (
              <Alert
                onClose={() => {
                  setCheaperAptUrl(null);
                  setAlertMsg('');
                }}
                variant="info"
                dismissible
              >
                {alertMsg}
                <Alert.Link href={cheaperAptUrl}>Check it out!</Alert.Link>
              </Alert>
            ) : null}
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
