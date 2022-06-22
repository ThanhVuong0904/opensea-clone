import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';
import styles from './Trending.module.scss';
import { Popper as PopperTrending } from '~/components/Popper';
import { allCategories as allcategoriesRender } from './FakeData';
import { NextPrevious, PrevPrevious } from './ArrowButton';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const {
    allCategories,
    solana,
    art,
    collectibles,
    domainName,
    music,
    photography,
    sports,
    tradingCard,
    utility,
    virtualWorlds,
} = images.trendingImages.light;
const TABS = [
    { icon: allCategories, name: 'All Catergories' },
    { icon: solana, name: 'Solana NFTs' },
    { icon: art, name: 'Art' },
    { icon: collectibles, name: 'Collectibles' },
    { icon: domainName, name: 'Domain Names' },
    { icon: music, name: 'Music' },
    { icon: photography, name: 'Photography' },
    { icon: sports, name: 'Sports' },
    { icon: tradingCard, name: 'Trading Cards' },
    { icon: utility, name: 'Utility' },
    { icon: virtualWorlds, name: 'Virtual Worlds' },
];
export default function Trending() {
    const popperRef = useRef();
    const [activeTab, setActiveTab] = useState('All Catergories');
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextPrevious />,
        prevArrow: <PrevPrevious />,
    };
    return (
        <div className={cx('wrapper')}>
            <PopperTrending heading="Trending in" activeTab={activeTab} ref={popperRef}>
                {TABS.map((tab, index) => (
                    <div key={index} className={cx('tab-item')} onClick={() => setActiveTab(tab.name)}>
                        <img src={tab.icon} alt={tab.name} />
                        <p>{tab.name}</p>
                    </div>
                ))}
            </PopperTrending>
            <div className={cx('trending-list')}>
                <Slider {...settings}>
                    {allcategoriesRender.map((item, index) => {
                        return (
                            <div className={cx('trending-item')} key={index}>
                                <img className={cx('background')} src={item.background} alt={item.name} />
                                <div className={cx('content')}>
                                    <div className={cx('avatar')}>
                                        <img src={item.avatar} alt={item.author} />
                                    </div>
                                    <div className={cx('name')}>
                                        <span>{item.name}</span>
                                        {item.tickName && (
                                            <img className={cx('verify-icon')} src={images.verify} alt="Verify" />
                                        )}
                                    </div>
                                    <div className={cx('author')}>
                                        <span>by &nbsp;</span>
                                        <span>{item.author}</span>
                                        {item.tickAu && (
                                            <img className={cx('verify-icon')} src={images.verify} alt="Verify" />
                                        )}
                                    </div>

                                    <p className={cx('description')}>{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
