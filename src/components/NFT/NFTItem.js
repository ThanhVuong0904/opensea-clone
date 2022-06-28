import classNames from 'classnames/bind';
import styles from './NFT.module.scss';

const cx = classNames.bind(styles);
export default function NFTItem({ data }) {
    return <div className={cx('wrapper')}></div>;
}
