import reactStringReplace from 'react-string-replace';
import classNames from 'classnames/bind';
import styles from './IntroCreateAndSell.module.scss';
import Section from '~/components/Section';
import images from '~/assets/images/';

const cx = classNames.bind(styles);

const { wallet, collection, nft, sale } = images.createAndSell;

const DATA = [
    {
        icon: wallet,
        title: 'Set up your wallet',
        description:
            'Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.',
        link: 'wallets we support.',
    },
    {
        icon: collection,
        title: 'Create your collection',
        description:
            'Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
        link: 'My Collections',
    },
    {
        icon: nft,
        title: 'Add your NFTs',
        description:
            'Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.',
    },
    {
        icon: sale,
        title: 'List them for sale',
        description:
            'Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!',
    },
];

export default function IntroCreateAndSell() {
    return (
        <Section title="Create and sell your NFTs" background>
            <div className={cx('wrapper')}>
                {DATA.map((item, index) => (
                    <div key={index} className={cx('item')}>
                        <img src={item.icon} alt={item.title} />
                        <h3 className={cx('title')}>{item.title}</h3>
                        <p className={cx('description')}>
                            {reactStringReplace(item.description, item.link, (match, i) => (
                                <a key={match + i} className={cx('highlight')}>
                                    {match}
                                </a>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
