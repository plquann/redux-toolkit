import Banner from 'components/Banner/Banner';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


MainPage.propTypes = {};

function MainPage(props) {
    const photos = useSelector(state => state.photos);
    const dispatch = useDispatch()
    const history = useHistory();
    console.log("🚀 ~ photos", photos);

    const handlePhotoEditClick = (photo) => {
        console.log('Photo clicked: ', photo);

        history.push(`/photos/${photo.id}`);

    };

    const handlePhotoRemoveClick = (photo) => {
        console.log('Photo removed: ', photo);

        const removePhotoId = photo.id;
        const action = removePhoto(removePhotoId);
       
        dispatch(action)
    };

    return (
        <div className="photo-main">
            <Banner title="🎉 Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

            <div className="container text-center">
                <div className="py-5">
                    <Link to="/photos/add">Add new photo</Link>
                </div>

                <PhotoList
                    photoList={photos}
                    onPhotoEditClick={handlePhotoEditClick}
                    onPhotoRemoveClick={handlePhotoRemoveClick}
                />

            </div>
        </div>
    );
}

export default MainPage;