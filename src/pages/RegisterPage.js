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
      username: 
    }
  }
};

export default RegisterPage;
