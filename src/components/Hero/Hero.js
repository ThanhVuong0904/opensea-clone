import classnames from 'classnames/bind';
import styles from './Hero.module.scss';
import images from '~/assets/images';

import Button from '~/components/Button';
import config from '~/config';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
const cx = classnames.bind(styles);

export default function Hero() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <div style={{ backgroundImage: `url(${images.start})` }}></div>
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <h1 className={cx('heading')}>Discover, collect, and sell extraordinary NFTs</h1>
                    <h3 className={cx('title')}>OpenSea is the world's first and largest NFT marketplace</h3>

                    <div className={cx('action')}>
                        <Button primary>Explore</Button>
                        <Button outline to={config.routes.create}>
                            Create
                        </Button>
                    </div>
                    <div className={cx('learn-more')}>
                        <PlayCircleFilledOutlinedIcon className={cx('learn-more-icon')} />
                        <span>Learn more about OpenSea</span>
                    </div>
                </div>

                <div className={cx('thumb-wrapper')}>
                    <img src={images.start} alt="" />
                </div>
            </div>
        </div>
    );
}
