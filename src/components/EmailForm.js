import React, { useContext, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoggedIn from './LoginContext';
import PropTypes from 'prop-types';

const EmailForm = ({ houseId }) => {
  const { loggedIn } = useContext(LoggedIn);
  const textAreaRef = useRef();
  const [textAreaInput, setTextAreaInput] = useState('');
  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (loggedIn.loggedIn) {
      try {
        await fetch(`/email/${houseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toPoster: true,
            html: textAreaInput,
          }),
        });
      } catch (err) {
        alert(`Failed to send email, error message: ${err}`);
      }
    } else {
      history.push('/login');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Contact Poster</h3>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder={
            loggedIn.loggedIn
              ? `Hello, my name is ${loggedIn.username}...`
              : 'Hello, my name is Unknown...'
          }
          ref={textAreaRef}
          value={textAreaInput}
          onChange={(evt) => setTextAreaInput(evt.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Send Email
      </Button>
    </Form>
  );
};

EmailForm.propTypes = {
  houseId: PropTypes.string.isRequired,
};

export default EmailForm;
