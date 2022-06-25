import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Button from '~/components/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { DiscordIcon, TiktokIcon } from './SocialIcon';

const cx = classNames.bind(styles);

const SOCIALS = [TwitterIcon, InstagramIcon, DiscordIcon, RedditIcon, YouTubeIcon, TiktokIcon, MailOutlinedIcon];

export default function Community() {
    return (
        <div className={cx('wrapper-background')}>
            <div className={cx('container')}>
                <div className={cx('left-community')}>
                    <p className={cx('community-title')}>Stay in the loop</p>
                    <p className={cx('left-desc')}>
                        Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips
                        and tricks for navigating OpenSea.
                    </p>

                    <div className={cx('wrapper-input')}>
                        <input className={cx('community-input')} type="text" placeholder="Your email address" />
                        <Button primary className={cx('left-btn')}>
                            Sign Up
                        </Button>
                    </div>
                </div>

                <div className={cx('right-community')}>
                    <p className={cx('community-title')}>Join the community</p>
                    <div className={cx('socials')}>
                        {SOCIALS.map((item, index) => {
                            const Social = item;
                            return (
                                <div key={index} className={cx('social')}>
                                    <Social className={cx('social-icon')} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
