import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { OpenseaIconWhite } from './OpenseaIconWhite';

const cx = classNames.bind(styles);

export default function About() {
    return (
        <div className={cx('wrapper-background')}>
            <div className={cx('container')}>
                <div className={cx('about')}>
                    <OpenseaIconWhite />
                </div>
            </div>
        </div>
    );
}
