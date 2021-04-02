import React from 'react';
import PropTypes from 'prop-types';
import './RandomPhoto.scss';

RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
    name: '',
    imageUrl: '',
    onImageUrlChange: null,
    onRandomButtonBlur: null,
}

const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 2000);
    return `https://picsum.photos/id/${randomId}/300/300`;
}

function RandomPhoto(props) {
    const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;

    const handleRandomPhotoClick = async () => {
        if (onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl();
            onImageUrlChange(randomImageUrl)
        }
    }

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <button
                    type="button"
                    className="btn btn-primary"
                    name={name}
                    color="primary"
                    onBlur={onRandomButtonBlur}
                    onClick={handleRandomPhotoClick}
                >
                    Random a photo
                </button>
            </div>

            <div className="random-photo__photo">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Ooops ... not found. Please click random again!"
                        onError={handleRandomPhotoClick}
                    />
                )}
            </div>
        </div>
    );
}

export default RandomPhoto;