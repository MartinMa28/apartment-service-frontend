import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import unavailableImg from '../images/unavailable-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faBed,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/HouseCard.css';

const HouseCard = ({ house }) => {
  const parseImgUrl = (images) => {
    console.log(unavailableImg);
    if (images.length === 0) {
      return unavailableImg;
    } else {
      return images[0];
    }
  };

  return (
    <Col x2={6} sm={4}>
      <Card style={{ width: '16rem' }} className="m-3">
        <Card.Img
          variant="top"
          src={parseImgUrl(house['images'])}
          onError={(evt) => {
            evt.target.onerror = null;
            evt.target.src = unavailableImg;
          }}
          className="card-img"
        />
        <Card.Body>
          <Card.Title>{house['result-title']}</Card.Title>
          <Card.Text>
            <FontAwesomeIcon icon={faDollarSign} /> {house['result-price']}
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faBed} /> {house['bedrooms']}
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faWarehouse} /> {house['area']} ft
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

HouseCard.propTypes = {
  house: PropTypes.object.isRequired,
};

export default HouseCard;
