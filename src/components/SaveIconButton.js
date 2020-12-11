import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import LoggedIn from '../components/LoginContext';
import { useHistory } from 'react-router-dom';

const SaveIconButton = ({ onToggle }) => {
  const { loggedIn } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = () => {
    if (loggedIn.loggedIn) {
      onToggle();
      console.log('should save over here');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="icon-btn-div" onClick={handleClick}>
      <div className="d-flex justify-content-center">Save</div>
      <div className="d-flex justify-content-center">
        <FontAwesomeIcon icon={Heart} className="mx-auto" />
      </div>
    </div>
  );
};

SaveIconButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default SaveIconButton;
