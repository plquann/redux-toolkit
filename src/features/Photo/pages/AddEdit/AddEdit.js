import React from 'react';
import './styles.scss';
import PhotoForm from 'features/Photo/components/PhotoForm';
import Banner from 'components/Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, editPhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';

AddEditPage.propTypes = {};

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();

    const isEdit = photoId;
    console.log("🚀 ~ isEdit", isEdit);

    const handleSubmit = (values) => {
        console.log('Form submit:', values);

        //fake overload when call API method
        setTimeout(() => {
            if (!isEdit) {
                const action = addPhoto({id: `${Math.floor(Math.random() * 2000)}`, ...values});
                dispatch(action);

                //redirect to photo
                history.push('/photos');
            }else{
                const action = editPhoto(values);
                dispatch(action);

                //redirect to photo
                history.push('/photos');
            }


        }, 2000)
    };

    const photoEdit = useSelector(state => state.photos.find(photo => photo.id === photoId));
    console.log("🚀 ~ editPhoto", photoEdit);

    const initialValues = !isEdit
        ? {
            title: '',
            categoryId: null,
            photo: '',
        }
        : {
            ...photoEdit,
        };

    console.log("🚀 ~ initialValues", initialValues);

    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo 😎" />

            <div className="photo-edit__form">
                <PhotoForm
                    initialValues={initialValues}
                    isEdit={isEdit}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default AddEditPage;