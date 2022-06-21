import classnames from 'classnames/bind';
import styles from './Default.module.scss';

import Header from '~/layouts/components/Header';

const cx = classnames.bind(styles);

export default function Default() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className="container">Content</div>
        </div>
    );
}
