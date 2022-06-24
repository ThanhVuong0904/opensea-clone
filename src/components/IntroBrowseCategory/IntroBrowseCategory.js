import classNames from 'classnames/bind';
import styles from './IntroBrowseCategory.module.scss';
import Section from '~/components/Section';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const { art, collectibles, domainNames, music, photography, sports, tradingCards, utility, virtualWorlds } =
    images.browserCategory;

const DATA = [
    { name: 'Art', image: art },
    { name: 'Collectibles', image: collectibles },
    { name: 'Domain Names', image: domainNames },
    { name: 'Music', image: music },
    { name: 'Photography', image: photography },
    { name: 'Sports', image: sports },
    { name: 'Trading Cards', image: tradingCards },
    { name: 'Utility', image: utility },
    { name: 'VirtualWorlds', image: virtualWorlds },
];

export default function IntroBrowseCategory() {
    return (
        <Section title="Browse by category">
            <div className={cx('wrapper')}>
                {DATA.map((item, index) => (
                    <div key={index} className={cx('item')}>
                        <img src={item.image} alt={item.name} />
                        <div className={cx('content')}>
                            <span className={cx('name')}>{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
