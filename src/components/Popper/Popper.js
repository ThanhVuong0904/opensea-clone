import { useState, useEffect, forwardRef } from 'react';
import classnames from 'classnames/bind';
import styles from './Popper.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const cx = classnames.bind(styles);

function Popper({ heading, activeTab, children }, ref) {
    const [showTab, setShowTab] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowTab(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        //Clean up function
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    return (
        <div className={cx('wrapper')} ref={ref}>
            <h1 className={cx('heading')}>{heading}</h1>
            <div className={cx('tabs')} onClick={() => setShowTab(!showTab)}>
                <span> &nbsp;{activeTab}</span>
                <div className={cx('section', { active: showTab })}>{children}</div>
                <KeyboardArrowDownIcon className={cx('arrow-down')} />
            </div>
        </div>
    );
}

export default forwardRef(Popper);
