import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Panel.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const cx = classNames.bind(styles);

function Panel({ icon, title, toggle, children }) {
    const [active, setActive] = useState(false);
    return (
        <div className={cx('wrapper', { active: active, toggle: toggle === false })}>
            <div className={cx('header')} onClick={() => setActive(!active)}>
                <div className={cx('icon')}>{icon}</div>
                <p className={cx('title')}>{title}</p>
                {toggle && <KeyboardArrowDownIcon className={cx('arrow-down')} />}
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default Panel;
