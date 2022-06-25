import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { OpenseaIconWhite } from './OpenseaIconWhite';

const cx = classNames.bind(styles);

const DATA = [
    {
        title: 'Marketplace',
        child: [
            { title: 'All NFTs' },
            { title: 'Solana NFTs' },
            { title: 'Art' },
            { title: 'Collectibles' },
            { title: 'Domain Names' },
            { title: 'Music' },
            { title: 'Photography' },
            { title: 'Sports' },
            { title: 'Trading Cards' },
            { title: 'Utility' },
            { title: 'Virtual Worlds' },
        ],
        child2: null,
    },
    {
        title: 'My Account',
        child: [
            { title: 'Profile' },
            { title: 'Favorites' },
            { title: 'Watchlist' },
            { title: 'My Collections' },
            { title: 'Settings' },
        ],
        child2: {
            title: 'Stats',
            child: [{ title: 'Rankings' }, { title: 'Activity' }],
        },
    },
    {
        title: 'Resources',
        child: [
            { title: 'Help Center' },
            { title: 'Platform Status' },
            { title: 'Partners' },
            { title: 'Gas-Free Marketplace' },
            { title: 'Taxes' },
            { title: 'Blog' },
            { title: 'Docs' },
            { title: 'Newsletter' },
        ],
        child2: null,
    },
    {
        title: 'Company',
        child: [{ title: 'About' }, { title: 'Careers' }, { title: 'Ventures' }, { title: 'Grants' }],
        child2: null,
    },
];

export default function About() {
    return (
        <div className={cx('wrapper-background')}>
            <div className={cx('container')}>
                <div className={cx('about')}>
                    <div className={cx('about-left')}>
                        <OpenseaIconWhite className={cx('about-logo')} />
                        <p className={cx('about-logo-link')}>OpenSea</p>
                        <p className={cx('about-logo-desc')}>
                            The world’s first and largest digital marketplace for crypto collectibles and non-fungible
                            tokens (NFTs). Buy, sell, and discover exclusive digital items.
                        </p>
                    </div>
                    <div className={cx('about-right')}>
                        {DATA.map((item, index) => (
                            <div key={index} className={cx('about-right-item')}>
                                <h3 className={cx('about-right-title')}>{item.title}</h3>
                                {item.child.map((itemChild, index) => (
                                    <p className={cx('about-right-link')} key={index}>
                                        {itemChild.title}
                                    </p>
                                ))}
                                {item.child2 !== null && (
                                    <div className={cx('about-right-item')}>
                                        <h3 className={cx('about-right-title', 'title-child')}>{item.child2.title}</h3>
                                        {item.child2.child.map((itemChild2, index) => (
                                            <p className={cx('about-right-link')} key={index}>
                                                {itemChild2.title}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
