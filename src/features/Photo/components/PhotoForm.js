import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types'
import InputField from 'custom-fields/InputField/InputField';
import SelectField from 'custom-fields/SelectField/SelectField';
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import RandomPhotoField from 'custom-fields/RandomPhotoField/RandomPhotoField';
import * as Yup from 'yup';

PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
    onSubmit: null,
}

function PhotoForm(props) {
    const { initialValues, isEdit } = props;
    console.log("🚀 ~ isEdit", isEdit);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required !'),

        categoryId: Yup.number().required('This field is required !').nullable(),

        photo: Yup.string().required('This field is required !'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}

        >
            {formikProps => {
                //property of formik 
                const { values, errors, touched, isSubmitting } = formikProps;
                console.log("🚀 ~ { value, errors, touched }", { values, errors, touched });

                return (
                    <Form>
                        <FastField
                            name="title"
                            component={InputField}
                            label="Title"
                            placeholder="Eg: Wow natural..."
                        />

                        <FastField
                            name="categoryId"
                            component={SelectField}
                            label="Category"
                            placeholder="What's your photo category?"
                            options={PHOTO_CATEGORY_OPTIONS}
                        />

                        <FastField
                            name="photo"
                            component={RandomPhotoField}
                            label="Photo"
                        />

                        <div className="d-flex justify-content-center">
                            <button type="submit" className={isEdit ? 'btn btn-success' : 'btn btn-primary'}>
                                {isSubmitting && <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                }
                                {isEdit ? 'Update Photo' : 'Add to Photos'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default PhotoForm;