import classnames from 'classnames/bind';
import styles from './Rankings.module.scss';
import RANKINGS from './FakeData';
import RankingItem from './RankingItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const cx = classnames.bind(styles);

export default function Rankings() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>
                Top collections over
                <span> last 24 hours</span>
                <KeyboardArrowDownIcon className={cx('arrow-down')} />
            </h1>
            <div className={cx('list')}>
                {RANKINGS.map((rank, index) => (
                    <RankingItem key={index} data={rank} />
                ))}
            </div>
        </div>
    );
}
