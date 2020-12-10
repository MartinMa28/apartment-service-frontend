import React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../styles/HomePage.css';

const HomePage = () => {
  const [roomNum, setRoomNum] = useState('1');
  const [minPrice, setMinPrice] = useState('---');
  const [maxPrice, setMaxPrice] = useState('---');
  const roomNumRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    let minIntPrice;
    let maxIntPrice;

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
      roomNumRef.current.value = '1';
      minPriceRef.current.value = '---';
      maxPriceRef.current.value = '---';
    } else {
      const queryObj = {
        rooms: roomNum,
        minPrice: minIntPrice,
        maxPrice: maxIntPrice,
        page: 1,
      };
      const url =
        '/house-list?' +
        Object.keys(queryObj)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key])
          )
          .join('&');

      setErrorMessage('');
      roomNumRef.current.value = '1';
      minPriceRef.current.value = '---';
      maxPriceRef.current.value = '---';

      history.push(url);
    }
  };

  return (
    <main>
      <Container fluid className="homepage-container">
        <Container>
          <Row>
            <Col xs={{ span: 6, offset: 2 }} className="p-0">
              <h1 className="mt-5">Find great deals</h1>
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ span: 6, offset: 2 }}
              className="search-form-container p-2 search-form-container"
            >
              <Form>
                <p>{errorMessage}</p>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="room-no-group">
                      <Form.Label>By no. rooms:</Form.Label>
                      <Form.Control
                        as="select"
                        size="sm"
                        custom
                        onChange={(evt) => setRoomNum(evt.target.value)}
                        ref={roomNumRef}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="price-from-group">
                      <Form.Label>By price from:</Form.Label>
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
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="price-to-group">
                      <Form.Label>By price to:</Form.Label>
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
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default HomePage;
