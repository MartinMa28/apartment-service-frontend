import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import LoggedIn from '../components/LoginContext';
import { useHistory } from 'react-router-dom';

const EmailIconButton = () => {
  const { loggedIn } = useContext(LoggedIn);
  const history = useHistory();

  const sendEmail = () => {
    if (loggedIn.loggedIn) {
      console.log('should save over here');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="icon-btn-div" onClick={sendEmail}>
      <div className="d-flex justify-content-center">Email</div>
      <div className="d-flex justify-content-center">
        <FontAwesomeIcon icon={faEnvelope} className="mx-auto" />
      </div>
    </div>
  );
};

export default EmailIconButton;
