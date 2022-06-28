import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CustomField.module.scss';

import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

const cx = classNames.bind(styles);
export default function InputField({ field, form, type, label, placehoder, disabled, subLabel, isRequire }) {
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup className={cx('form-group')}>
            {label && (
                <Label for={name} className={cx('label')}>
                    {label} {isRequire && <span className={cx('tag')}>*</span>}
                </Label>
            )}
            {subLabel && <span className={cx('sub-label')}>{subLabel}</span>}
            <Input
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={cx('input', { text: type === 'text', area: type === 'textarea', file: type === 'file' })}
                placeholder={placehoder}
                disabled={disabled}
                rows="5"
                invalid={showError}
            />
            {/* {showError && <p className={cx('form-feedback')}>{errors[name]}</p>} */}
            <ErrorMessage className={cx('form-feedback')} name={name} component={FormFeedback} />
        </FormGroup>
    );
}

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    placehoder: PropTypes.string,
    disable: PropTypes.bool,
    isRequire: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    subLabel: '',
    placehoder: '',
    disable: false,
    isRequire: false,
};
