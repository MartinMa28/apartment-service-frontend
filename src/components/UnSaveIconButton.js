import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LoggedIn from '../components/LoginContext';
import { useHistory } from 'react-router-dom';

const UnSaveIconButton = ({ onToggle }) => {
  const { loggedIn } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = () => {
    if (loggedIn.loggedIn) {
      onToggle();
      console.log('should un-save over here');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="icon-btn-div" onClick={handleClick}>
      <div className="d-flex justify-content-center">Un-Save</div>
      <div className="d-flex justify-content-center">
        <FontAwesomeIcon icon={Heart} className="mx-auto" />
      </div>
    </div>
  );
};

UnSaveIconButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default UnSaveIconButton;
