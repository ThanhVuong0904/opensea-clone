import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Form, FastField, Field } from 'formik';
import * as yup from 'yup';

import classNames from 'classnames/bind';
import styles from './Create.module.scss';

import { AuthenticateContext } from '~/contexts/AuthenticateContext';
import { InputField, UploadField } from '~/components/CustomField';
import { FormGroup } from 'reactstrap';
import Button from '~/components/Button';
// import config from '~/config';
// import { Navigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Create() {
    const { account, active } = useContext(AuthenticateContext);
    const initValues = {
        asset: '',
        name: '',
        desc: '',
        externalLink: '',
    };
    let schema = yup.object().shape({
        name: yup.string().required('This field is required.'),
        // asset: yup.mixed().required('File is required'),
    });
    const handleSubmit = () => {};
    return (
        <div className={cx('d-flex')}>
            <Helmet>
                <title>Create NFTs | OpenSea</title>
            </Helmet>
            <div className={cx('wrapper')}>
                <h1 className={cx('heading')}>Create New Item</h1>
                <Formik
                    initialValues={initValues}
                    validationSchema={schema}
                    onSubmit={(values) => console.log('Submit', values)}
                >
                    {(formikProps) => {
                        const { values, errors, touched, isSubmitting, isValid, dirty, submitForm } = formikProps;
                        return (
                            <Form>
                                <span className={cx('require-field')}>
                                    <span style={{ color: 'red' }}>*</span> Required fields
                                </span>
                                <div style={{ marginTop: 10 }}>
                                    <FastField
                                        name="asset"
                                        component={UploadField}
                                        type="file"
                                        label="Image, Video, Audio, or 3D Model"
                                        subLabel="File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB"
                                        isRequire
                                    />
                                    <FastField
                                        name="name"
                                        component={InputField}
                                        label="Name"
                                        placehoder="Item name"
                                        isRequire
                                    />
                                    <FastField
                                        name="externalLink"
                                        component={InputField}
                                        label="External Link"
                                        placehoder="https://youtube.com"
                                        subLabel="OpenSea will include a link to this URL on this item is detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
                                    />

                                    <FastField
                                        name="desc"
                                        component={InputField}
                                        type="textarea"
                                        label="Description"
                                        placehoder="Provide a detailed description of your item."
                                        subLabel="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
                                    />
                                </div>
                                <FormGroup>
                                    <Button primary small type="submit">
                                        Create
                                    </Button>
                                </FormGroup>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}
