import classNames from 'classnames/bind';
import styles from './IntroResourcesAndStarted.module.scss';
import Section from '~/components/Section';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const { image1, image2, image3 } = images.resoucesForGettingStarted;
const DATA = [
    { name: 'How to Easily Setup a MetaMask Wallet', image: image1 },
    { name: 'How to Fund MetaMask with ETH', image: image2 },
    { name: 'How to Find an NFT You Love', image: image3 },
];

export default function IntroResourcesAndStarted() {
    return (
        <Section title="Resources for getting started">
            <div className={cx('wrapper')}>
                {DATA.map((item, index) => (
                    <div key={index} className={cx('item')}>
                        <img src={item.image} alt={item.name} />
                        <div className={cx('content')}>
                            <p className={cx('name')}>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
