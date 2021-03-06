import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Community from './Community';
import {
    AndreessenIcon,
    ParadigmIcon,
    CombinatorIcon,
    CoatueIcon,
    FoundersFundIcon,
    BlockChainCapitalIcon,
} from './BrandIcon';
import About from './About';
const cx = classNames.bind(styles);

const BRANDS = [AndreessenIcon, ParadigmIcon, CombinatorIcon, CoatueIcon, FoundersFundIcon, BlockChainCapitalIcon];

export default function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('wrapper-brands')}>
                <div className={cx('brands')}>
                    {BRANDS.map((item, index) => {
                        const Brand = item;
                        return <Brand key={index} className={cx('brand-icon')} fillText={cx('fill-text')} />;
                    })}
                </div>
            </div>
            <Community />
            <About />
            <div className={cx('wrapper-background')}>
                <div className={cx('container', 'copy-right')}>
                    <p className={cx('copy-right-item')}>© 2018 - 2022 Ozone Networks, Inc</p>
                    <div className={cx('d-flex')}>
                        <p className={cx('copy-right-item')}>Privacy Policy</p>
                        <p className={cx('copy-right-item')}>Terms of Service</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
