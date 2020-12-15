import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import LoggedIn from '../components/LoginContext';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const EmailIconButton = ({ houseId }) => {
  const { loggedIn } = useContext(LoggedIn);
  const history = useHistory();

  const sendEmail = async () => {
    if (loggedIn.loggedIn) {
      try {
        await fetch(`/email/${houseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ toPoster: false }),
        });
      } catch (err) {
        alert(`Failed to send email, error message: ${err}`);
      }
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

EmailIconButton.propTypes = {
  houseId: PropTypes.string.isRequired,
};

export default EmailIconButton;
