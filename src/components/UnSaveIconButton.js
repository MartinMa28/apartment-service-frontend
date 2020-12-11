import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const UnSaveIconButton = ({ onToggle }) => {
  return (
    <div className="icon-btn-div" onClick={onToggle}>
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
