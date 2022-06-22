import classnames from 'classnames/bind';
import styles from './Popper.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

const cx = classnames.bind(styles);

export default function Popper({ heading, activeTab, children }) {
    const [showTab, setShowTab] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>{heading}</h1>
            <div className={cx('tabs')} onClick={() => setShowTab(!showTab)}>
                <span> &nbsp;{activeTab}</span>
                <div className={cx('section', { active: showTab })}>{children}</div>
                <KeyboardArrowDownIcon className={cx('arrow-down')} />
            </div>
        </div>
    );
}
