import classnames from 'classnames/bind';
import styles from './Banner.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
const cx = classnames.bind(styles);

export default function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')} style={{ backgroundImage: `url(${images.homeBanner})` }}>
                <h3 className={cx('title')}>Solana is in beta on OpenSea</h3>
                <Button primary small>
                    Explore
                </Button>
            </div>
        </div>
    );
}
