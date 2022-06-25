import PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import styles from './Default.module.scss';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
const cx = classnames.bind(styles);

export default function Default({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}

Default.propTypes = {
    children: PropTypes.node.isRequired,
};
