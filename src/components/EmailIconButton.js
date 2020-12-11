import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const EmailIconButton = () => {
  const sendEmail = () => {
    console.log('should be sending email over here');
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
