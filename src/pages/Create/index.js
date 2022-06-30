import { useContext, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useMoralisFile } from 'react-moralis';
import { ethers } from 'ethers';

import classNames from 'classnames/bind';
import styles from './Create.module.scss';

import { AuthenticateContext } from '~/contexts/AuthenticateContext';
import { InputField } from '~/components/CustomField';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Button from '~/components/Button';
import PhotoIcon from '@mui/icons-material/Photo';
import { NFTAbi } from '~/abi';

const SUPPORT_FORMAT = ['image/jpg', 'image/jpge', 'image/png'];
const cx = classNames.bind(styles);

export default function Create() {
    const { account, active, library } = useContext(AuthenticateContext);
    const { saveFile } = useMoralisFile();
    const uploadFileRef = useRef();

    const initValues = {
        asset: '',
        name: '',
        desc: '',
        externalLink: '',
    };
    let schema = yup.object().shape({
        name: yup.string().required('This field is required.'),
        asset: yup
            .mixed()
            .nullable()
            .required()
            .test('FILE_SIZE', 'Uploaded file is too big', (value) => !value || (value && value.size < 1024 * 1024))
            .test(
                'FILE_FORMAT',
                'Uploaded file has unsupported format.',
                (value) => !value || (value && SUPPORT_FORMAT.includes(value?.type)),
            ),
    });
    const handleSubmit = async (values) => {
        let metadata = {};
        const imageURL = await saveFile('image_nft', values.asset, { saveIPFS: true });
        console.log('Uploaded image to ipfs', imageURL._url);
        if (values.externalLink.trim() !== '') {
            metadata = {
                name: values.name,
                image: imageURL._url,
                description: values.desc,
                external_url: values.externalLink,
            };
        } else {
            metadata = {
                name: values.name,
                image: imageURL._url,
                description: values.desc,
            };
        }
        const metadataUrl = await saveFile('metadata.json', {
            base64: btoa(JSON.stringify(metadata), { saveIPFS: true }),
        });
        console.log('Create Metadata', metadataUrl._url);

        const signer = library.getSigner();
        const contractAddress = '0x219FEcB361c0475D86BF9A2D28Ce828233ed914f';
        const contract = new ethers.Contract(contractAddress, NFTAbi, signer);
        try {
            await contract.safeMint(account, metadataUrl._url);
        } catch (err) {
            console.log(err);
        }
    };
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
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {(formikProps) => {
                        const { values, setFieldValue } = formikProps;
                        return (
                            <Form>
                                <span className={cx('require-field')}>
                                    <span style={{ color: 'red' }}>*</span> Required fields
                                </span>
                                <div style={{ marginTop: 10 }}>
                                    {/* <FastField
                                        name="asset"
                                        component={UploadField}
                                        onChange={(e) => setFieldValue('asset', e.currentTarget.files[0])}
                                        type="file"
                                        label="Image, Video, Audio, or 3D Model"
                                        subLabel="File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB"
                                        isRequire
                                    /> */}
                                    <FormGroup className={cx('form-group')}>
                                        <Label for="asset" className={cx('label')}>
                                            Image, Video, Audio, or 3D Model<span className={cx('tag')}>*</span>
                                        </Label>
                                        <span className={cx('sub-label')}>
                                            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
                                            GLTF. Max size: 100 MB
                                        </span>
                                        <input
                                            hidden
                                            ref={uploadFileRef}
                                            type="file"
                                            name="asset"
                                            onChange={(e) => setFieldValue('asset', e.currentTarget.files[0])}
                                        />
                                        <ErrorMessage
                                            name="asset"
                                            className={cx('form-feedback')}
                                            component={FormFeedback}
                                        />
                                    </FormGroup>
                                    <div className={cx('preview-image')} onClick={() => uploadFileRef.current.click()}>
                                        <PhotoIcon className={cx('photo-icon')} />
                                        {values.asset && (
                                            <img
                                                className={cx('preview')}
                                                src={URL.createObjectURL(values.asset)}
                                                alt="Preview"
                                            />
                                        )}
                                    </div>
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
