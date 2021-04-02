import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import RandomPhoto from 'components/RandomPhoto/RandomPhoto';

RandomPhotoField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
    label: '',
}

function RandomPhotoField(props) {
    const { field, form, label } = props;
    const { name, value, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleImageUrlChange = (newImageUrl) => {
        form.setFieldValue(name, newImageUrl)
    }

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}

            <RandomPhoto
                name={name}
                imageUrl={value}
                onImageUrlChange={handleImageUrlChange}
                onRandomButtonBlur={onBlur}
            />
            
            <div className={showError ? 'is-invalid' : ''}></div>
            
            <ErrorMessage name={name}>{showError => <p className="text-danger">{showError}</p>}</ErrorMessage>
        </div>
    );
}

export default RandomPhotoField;