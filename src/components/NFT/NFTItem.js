import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './NFT.module.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENUS = [
    { name: 'Sell', icon: <LocalOfferIcon /> },
    { name: 'Copy link', icon: <InsertLinkIcon /> },
    { name: 'Transfer', icon: <SendIcon /> },
    { name: 'Make profile picture', icon: <ImageIcon /> },
    { name: 'Hide', icon: <VisibilityOffIcon /> },
];
export default function NFTItem({ name, id, address, price, isSold, metadata }) {
    const render = () => {
        return MENUS.map((menu, index) => (
            <div key={index} className={cx('menu-item')}>
                <div className={cx('menu-icon')}>{menu.icon}</div>
                <p className={cx('menu-name')}>{menu.name}</p>
            </div>
        ));
    };
    return (
        <Link to={`/${address}/${id}`} className={cx('wrapper')}>
            <div className={cx('nft-image')}>
                <img src={metadata.image} alt={metadata.name} />
            </div>
            <div className={cx('content')}>
                <div>
                    <p className={cx('name')}>{metadata.name}</p>
                    <p className={cx('collection')}>{name}</p>
                </div>

                {isSold && (
                    <div className={cx('price')}>
                        <p className={cx('name')}>Price</p>
                        <div className={cx('d-flex', 'align-center')}>
                            <Tippy content="ETH">
                                <img style={{ width: 16, height: 16 }} src={images.etherum} alt="Etherum" />
                            </Tippy>
                            <p className={cx('txt-pri-fw600 fz-16')}>{(price / 1e18).toFixed(4)}</p>
                        </div>
                    </div>
                )}
                <Tippy
                    content="More options"
                    placement="top-start"
                    interactive
                    hideOnClick={true}
                    render={(attrs) => (
                        <div className={cx('menu')} tabIndex="-1" {...attrs}>
                            {render()}
                        </div>
                    )}
                >
                    <MoreHorizIcon className={cx('dots-icon')} />
                </Tippy>
            </div>
        </Link>
    );
}
