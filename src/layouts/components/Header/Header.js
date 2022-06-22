import { useState, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import { AccountCircleOutlined } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const cx = classnames.bind(styles);

const MENU = [
    { title: 'Explore', path: config.routes.explore },
    { title: 'Stats', path: config.routes.stats },
    { title: 'Resources', path: config.routes.resources },
    { title: 'Create', path: config.routes.create },
];

export default function Header() {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Logo" />
                    <span className={cx('logo-text')}>OpenSea</span>
                </Link>

                {/* Search */}
                <div className={cx('search')}>
                    <SearchOutlinedIcon className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Search items, collections, and accounts"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        ref={inputRef}
                    />
                    {searchValue && (
                        <div onClick={handleClear} style={{ display: 'flex' }}>
                            <ClearIcon className={cx('clear-icon')} />
                        </div>
                    )}
                </div>

                <div className={cx('d-flex')}>
                    <div className={cx('menu')}>
                        {MENU.map((menu, index) => (
                            <NavLink
                                key={index}
                                to={menu.path}
                                className={(link) => cx('menu-link', { active: link.isActive })}
                            >
                                {menu.title}
                            </NavLink>
                        ))}
                    </div>

                    <div className={cx('account')}>
                        <AccountCircleOutlined className={cx('account-icon')} />
                        <AccountBalanceWalletOutlinedIcon className={cx('account-wallet')} />
                    </div>
                </div>
            </div>
        </header>
    );
}
