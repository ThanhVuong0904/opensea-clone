import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import images from '~/assets/images';
import { faCircleXmark, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { AccountCircleOutlined } from '@mui/icons-material';

const cx = classnames.bind(styles);

const MENU = [
    { title: 'Explore', path: config.routes.explore },
    { title: 'Stats', path: config.routes.stats },
    { title: 'Resources', path: config.routes.resources },
    { title: 'Create', path: config.routes.create },
];

export default function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Logo" />
                    <span className={cx('logo-text')}>OpenSea</span>
                </Link>

                {/* Search */}
                <div className={cx('search')}>
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Search items, collections, and accounts" />
                    <FontAwesomeIcon icon={faCircleXmark} />
                </div>

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
                </div>
            </div>
        </header>
    );
}
