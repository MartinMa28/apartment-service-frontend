import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const SaveIconButton = ({ onToggle }) => {
  return (
    <div className="icon-btn-div" onClick={onToggle}>
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
