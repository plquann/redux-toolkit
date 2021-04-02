import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard';


PhotoList.propTypes = {
    photoList: PropTypes.array,
    onPhotoEditClick: PropTypes.func,
    onPhotoRemoveClick: PropTypes.func,
};

PhotoList.defaultProps = {
    photoList: [],
    onPhotoEditClick: null,
    onPhotoRemoveClick: null,
};

function PhotoList(props) {
    const { photoList, onPhotoEditClick, onPhotoRemoveClick } = props;

    return (
        <div className="row">
            {photoList.map(photo => (
                <div key={photo.title} className="col-lg-3 col-sm-12 col-md-6">
                    <PhotoCard
                        photo={photo}
                        onEditClick={onPhotoEditClick}
                        onRemoveClick={onPhotoRemoveClick}
                    />
                </div>
            ))}
        </div>
    );
}

export default PhotoList;