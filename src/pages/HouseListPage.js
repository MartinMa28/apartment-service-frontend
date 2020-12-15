import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import DetailedSearchForm from '../components/DetailedSearchForm';
import HouseCard from '../components/HouseCard';
import '../styles/HouseListPage.css';

const HouseListPage = () => {
  const location = useLocation();
  const [houses, setHouses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(-1);

  const fetchHousings = async () => {
    try {
      console.log(`fetch url: ${'/houses' + location.search}`);
      const resp = await fetch('/houses' + location.search);
      const respJson = await resp.json();

      const params = new URLSearchParams(location.search);
      setCurrentPage(params.get('page'));
      setHouses(respJson.apartments);
      setTotalPages(respJson.pages);
    } catch (err) {
      console.log(err);
    }
  };

  const pageUrl = (pageNum) => {
    if (pageNum < 1) {
      pageNum = 1;
    }

    if (pageNum > totalPages) {
      pageNum = totalPages;
    }

    const params = new URLSearchParams(location.search);
    params.set('page', pageNum);

    return params.toString();
  };

  useEffect(() => {
    fetchHousings();
  }, []);

  return (
    <main>
      <Container>
        <Row>
          <Col xs={4} sm={2} className="m-4">
            <DetailedSearchForm />
          </Col>
          <Col>
            <Container>
              <Row className="m-4">
                {houses.map((house, idx) => (
                  <HouseCard key={idx.toString()} house={house} />
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Pagination>
            <Pagination.First href={`/house-list?${pageUrl(1)}`} />
            <Pagination.Prev href={`/house-list?${pageUrl(currentPage - 1)}`} />
            <Pagination.Item
              active
              href={`/house-list?${pageUrl(currentPage)}`}
            >
              {currentPage}
            </Pagination.Item>
            <Pagination.Next href={`/house-list?${pageUrl(currentPage + 1)}`} />
            <Pagination.Last href={`/house-list?${pageUrl(totalPages)}`} />
          </Pagination>
        </Row>
      </Container>
    </main>
  );
};

export default HouseListPage;
