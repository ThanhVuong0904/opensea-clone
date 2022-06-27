import PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import styles from '~/layouts/Default/Default.module.scss';

import Header from '~/layouts/components/Header';
const cx = classnames.bind(styles);

export default function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};
