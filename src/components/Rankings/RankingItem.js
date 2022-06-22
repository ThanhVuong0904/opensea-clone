import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classnames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Rankings.module.scss';

const cx = classnames.bind(styles);

export default function RankingItem({ data }) {
    return (
        <div className={cx('ranking-item')}>
            <span className={cx('rank')}>{data.rank}</span>
            <img className={cx('avatar')} src={data.avatar} alt={data.name} />
            <div className={cx('content')}>
                <Tippy content={data.name} placement="bottom">
                    <p className={cx('name')}>{data.name}</p>
                </Tippy>
                <div className={cx('floor-price')}>
                    <span className={cx('floor-price-title')}>Floor Price: </span>
                    <span>
                        <Tippy content={'ETH'} placement="bottom">
                            <img className={cx('etherum-icon')} src={images.etherum} alt="Etherum" />
                        </Tippy>
                        <span className={cx('floor-price-price')}>{data.floorPrice}</span>
                    </span>
                </div>
            </div>
            <div className={cx('slippage')}>
                {data.percentageSlippage ? (
                    <p
                        className={cx('slippage-percent', {
                            up: data.percentageSlippage > 0,
                            down: data.percentageSlippage < 0,
                        })}
                    >
                        {data.percentageSlippage > 0 && '+'}
                        {data.percentageSlippage}%
                    </p>
                ) : (
                    <span className={cx('space')}>-</span>
                )}
                <div className={cx('d-flex')}>
                    <Tippy content={'ETH'} placement="bottom">
                        <img className={cx('etherum-icon')} src={images.etherum} alt="Etherum" />
                    </Tippy>
                    <span>{data.price}</span>
                </div>
            </div>
        </div>
    );
}

RankingItem.propTypes = {
    data: PropTypes.object.isRequired,
};
