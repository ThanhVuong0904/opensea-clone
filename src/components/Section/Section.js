import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

export default function Section({ title, children, background = false }) {
    return (
        <div className={cx('wrapper', { background })}>
            <h1 className={cx('title')}>{title}</h1>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    background: PropTypes.bool,
};
