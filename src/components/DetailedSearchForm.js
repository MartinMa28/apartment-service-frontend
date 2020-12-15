import React, { useRef, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const DetailedSearchForm = ({ onChange }) => {
  const bedroomsRef = useRef();
  const [bedrooms, setBedrooms] = useState(1);
  const minAreaRef = useRef();
  const [minArea, setMinArea] = useState('---');
  const maxAreaRef = useRef();
  const [maxArea, setMaxArea] = useState('---');
  const minPriceRef = useRef();
  const [minPrice, setMinPrice] = useState('---');
  const maxPriceRef = useRef();
  const [maxPrice, setMaxPrice] = useState('---');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleFilter = async () => {
    let minIntArea;
    let maxIntArea;
    let minIntPrice;
    let maxIntPrice;

    if (minArea === '---') {
      minIntArea = 0;
    } else {
      minIntArea = parseInt(minArea.substring(0, minArea.length - 2));
    }

    if (maxArea === '---') {
      maxIntArea = 9999999;
    } else {
      maxIntArea = parseInt(maxArea.substring(0, maxArea.length - 2));
    }

    if (minPrice === '---') {
      minIntPrice = 0;
    } else {
      minIntPrice = parseInt(minPrice.substring(1));
    }

    if (maxPrice === '---') {
      maxIntPrice = 9999999;
    } else {
      maxIntPrice = parseInt(maxPrice.substring(1));
    }

    if (minIntPrice >= maxIntPrice) {
      setErrorMessage("'Price From' should be less than 'Price To'");
      bedroomsRef.current.value = '1';
      minAreaRef.current.value = '---';
      maxAreaRef.current.value = '---';
      minPriceRef.current.value = '---';
      maxPriceRef.current.value = '---';
    } else if (minIntArea >= maxIntArea) {
      setErrorMessage("'Area From' should be less than 'Area To'");
      bedroomsRef.current.value = '1';
      minAreaRef.current.value = '---';
      maxAreaRef.current.value = '---';
      minPriceRef.current.value = '---';
      maxPriceRef.current.value = '---';
    } else {
      const queryObj = {
        rooms: bedrooms,
        minArea: minIntArea,
        maxArea: maxIntArea,
        minPrice: minIntPrice,
        maxPrice: maxIntPrice,
        page: 1,
      };
      let url =
        '/house-list?' +
        Object.keys(queryObj)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key])
          )
          .join('&');
      setErrorMessage('');
      console.log(url);
      history.push(url);

      url =
        '/houses?' +
        Object.keys(queryObj)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key])
          )
          .join('&');
      console.log(url);
      const resp = await fetch(url);
      const respJson = await resp.json();

      onChange(respJson.apartments, parseInt(respJson.pages), parseInt(1));
    }
  };

  return (
    <Form>
      <p>{errorMessage}</p>
      <Form.Group as={Row} controlId="detailedBedrooms">
        <Form.Label column xs={5}>
          Bedrooms:
        </Form.Label>
        <Col xs={7}>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(evt) => setBedrooms(evt.target.value)}
            ref={bedroomsRef}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="detailedMinArea">
        <Form.Label column xs={5}>
          Area From:
        </Form.Label>
        <Col xs={7}>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(evt) => setMinArea(evt.target.value)}
            ref={minAreaRef}
          >
            <option>---</option>
            <option>100ft</option>
            <option>400ft</option>
            <option>700ft</option>
            <option>1000ft</option>
            <option>1300ft</option>
            <option>1600ft</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="detailedMaxArea">
        <Form.Label column xs={5}>
          Area To:
        </Form.Label>
        <Col xs={7}>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(evt) => setMaxArea(evt.target.value)}
            ref={maxAreaRef}
            defaultValue="---"
          >
            <option>100ft</option>
            <option>400ft</option>
            <option>700ft</option>
            <option>1000ft</option>
            <option>1300ft</option>
            <option>1600ft</option>
            <option>1900ft</option>
            <option>2200ft</option>
            <option>2500ft</option>
            <option>---</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="detailedMinPrice">
        <Form.Label column xs={5}>
          Price From:
        </Form.Label>
        <Col xs={7}>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(evt) => setMinPrice(evt.target.value)}
            ref={minPriceRef}
          >
            <option>---</option>
            <option>$1000</option>
            <option>$1500</option>
            <option>$2000</option>
            <option>$2500</option>
            <option>$2500</option>
            <option>$3000</option>
            <option>$3500</option>
            <option>$4000</option>
            <option>$4500</option>
            <option>$5000</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="detailedMaxPrice">
        <Form.Label column xs={5}>
          Price To:
        </Form.Label>
        <Col xs={7}>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(evt) => setMaxPrice(evt.target.value)}
            ref={maxPriceRef}
            defaultValue="---"
          >
            <option>$1000</option>
            <option>$1500</option>
            <option>$2000</option>
            <option>$2500</option>
            <option>$2500</option>
            <option>$3000</option>
            <option>$3500</option>
            <option>$4000</option>
            <option>$4500</option>
            <option>$5000</option>
            <option>$5500</option>
            <option>$6000</option>
            <option>---</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Button variant="primary" onClick={handleFilter}>
        Filter
      </Button>
    </Form>
  );
};

DetailedSearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DetailedSearchForm;
