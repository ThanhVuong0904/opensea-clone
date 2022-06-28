import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CustomField.module.scss';
import PhotoIcon from '@mui/icons-material/Photo';

import { FormGroup, Label, Input } from 'reactstrap';

const cx = classNames.bind(styles);
export default function UploadField({ field, type, label, placehoder, disabled, subLabel, isRequire }) {
    const { name } = field;
    // const { name, value, onChange, onBlur } = field;
    const [blob, setBlob] = useState();
    const handleUpload = (e) => {
        const file = e.target.files[0];
        setBlob(URL.createObjectURL(file));
    };
    return (
        <FormGroup className={cx('form-group')}>
            {label && (
                <Label for={name} className={cx('label')}>
                    {label} {isRequire && <span className={cx('tag')}>*</span>}
                </Label>
            )}
            {subLabel && <span className={cx('sub-label')}>{subLabel}</span>}
            <div className={cx('wrapper-file')} onClick={() => document.getElementById(name).click()}>
                <>
                    <PhotoIcon className={cx('photo-icon')} />
                    <Input
                        id={name}
                        type={type}
                        className={cx('input', 'file')}
                        {...field}
                        onChange={handleUpload}
                        placeholder={placehoder}
                        disabled={disabled}
                    />
                </>
                {blob && <img className={cx('preview')} src={blob} alt="Preview" />}
            </div>
        </FormGroup>
    );
}

UploadField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    placehoder: PropTypes.string,
    disable: PropTypes.bool,
    isRequire: PropTypes.bool,
};

UploadField.defaultProps = {
    type: 'text',
    label: '',
    subLabel: '',
    placehoder: '',
    disable: false,
    isRequire: false,
};
