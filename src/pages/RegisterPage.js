import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bodyObj = {
      username: username,
      email: email,
      password: password,
    };
    const formBody = Object.keys(bodyObj)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(bodyObj[key])
      )
      .join('&');

    try {
      let response = await fetch('/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: formBody,
      });

      if (response.status === 200) {
        history.replace('/login');
      } else if (response.status === 500) {
        const responseJson = await response.json();
        const errorMsg = responseJson.message;
        setErrorMessage(errorMsg ? errorMsg : 'Registration Error');
      }
    } catch (err) {
      alert(`${err} Please contact the developer.`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4 p-2 m-5">
          <Form
            onSubmit={handleSubmit}
            className="border p-5 shadow rounded bg-light register-form"
          >
            <h4 className="mb-4 text-center">Sign Up</h4>
            <p>{errorMessage}</p>
            <Form.Group controlId="register-form-username-group">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                ref={usernameRef}
                onChange={(evt) => setUsername(evt.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="register-form-email-group">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="register-form-pwd-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </Form.Group>

            <p className="p-4 text-center">
              Already have an account?
              <Link to="/login" replace>
                Sign In
              </Link>
            </p>

            <Button type="submit" className="btn btn-secondary my-4 btn-block">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
