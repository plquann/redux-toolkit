import React from 'react';
import PropTypes from 'prop-types';
import './PhotoCard.scss';

PhotoCard.propTypes = {
  photo: PropTypes.object,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

PhotoCard.defaultProps = {
  photo: {},
  onEditClick: null,
  onRemoveClick: null,
}

function PhotoCard(props) {
  const { photo, onEditClick, onRemoveClick } = props;

  const handleEditClick = () => {
    if (onEditClick) onEditClick(photo);
  }

  const handleRemoveClick = () => {
    if (onRemoveClick) onRemoveClick(photo);
  }

  return (
    <div className="photo">
      <img src={photo.photo} alt={photo.title} />

      <div className="photo__overlay">
        <h3 className="photo__title">{photo.title}</h3>

        <div className="photo__actions">
          <div>
            <button className="btn btn-light" onClick={handleEditClick}>
              Edit
            </button>
          </div>

          <div>
            <button className="btn btn-danger" onClick={handleRemoveClick}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;