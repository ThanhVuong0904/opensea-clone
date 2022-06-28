import classNames from 'classnames/bind';
import styles from '././Detail.module.scss';

const cx = classNames.bind(styles);

function PanelItem({ data, detail }) {
    return (
        <div className={cx('panel-item')}>
            <div className={cx('panel-header')}>
                <div className={cx('panel-icon')}>{data.icon}</div>
                <p className={cx('panel-name')}>{data.name}</p>
            </div>
            <div className={cx('panel-content')} style={{ display: 'flex' }}>
                <span>By you</span>
                <p>Description</p>
            </div>
        </div>
    );
}

export default PanelItem;
