import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import LoggedIn from '../components/LoginContext';
import { useHistory } from 'react-router-dom';

const SaveIconButton = ({ onSave, houseId }) => {
  const { loggedIn } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    if (loggedIn.loggedIn) {
      try {
        const resp = await fetch(`/watch/add/${houseId}`);
        if (resp.status === 200) {
          onSave(true);
        }
      } catch (err) {
        alert(
          `Failed to watch apartment: ${houseId}. Please contact the developer.`
        );
        console.log(err);
      }
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
  onSave: PropTypes.func.isRequired,
  houseId: PropTypes.string.isRequired,
};

export default SaveIconButton;
