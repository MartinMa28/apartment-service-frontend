import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const UnSaveIconButton = ({ onSave, houseId }) => {
  const handleClick = async () => {
    try {
      const resp = await fetch(`/watch/delete/${houseId}`);

      if (resp.status === 200) {
        onSave(false);
      }
    } catch (err) {
      alert(
        `Failed to un-watch apartment: ${houseId}. Please contact the developer.`
      );
      console.log(err);
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
  onSave: PropTypes.func.isRequired,
  houseId: PropTypes.string.isRequired,
};

export default UnSaveIconButton;
