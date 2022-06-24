import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';
import styles from './MeetOpenSea.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

export default function MeetOpenSea() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>Meet OpenSea</h1>
            <h3 className={cx('title')}>The NFT marketplace with everything for everyone</h3>

            <div className={cx('container')}>
                <ReactPlayer url="https://www.youtube.com/watch?v=gfGuPd1CELo" width="100%" height="100%" />
                <p className={cx('sub-title')}>Fiat on-ramp and profile customization is coming soon.</p>
            </div>
            <div className={cx('btn')}>
                <Button primary>Explore the marketplace</Button>
            </div>
        </div>
    );
}
