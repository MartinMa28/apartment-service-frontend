import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoggedIn from '../components/LoginContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    if (!loggedIn.loggedIn) {
      history.push('/login');
    } else {
      try {
        const response = await fetch('/auth/logout');

        if (response.status === 200) {
          setLoggedInHelper(false, null);
        } else {
          alert('Failed to log out. Please contact the developer.');
        }
      } catch (err) {
        alert(`${err} Please contact the developer.`);
      }
    }
  };

  return (
    <>
      <Navbar className="navbar" bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/" className="brand">
          Home Service
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item as="li" className="p-1">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="p-1">
              <Nav.Link href="/houses">Available Housing for Rent</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button
            variant="outline-secondary"
            onClick={handleClick}
            className="p-1"
          >
            {loggedIn.loggedIn ? 'Sign Out' : 'Sign In'}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
