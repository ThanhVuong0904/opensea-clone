import { useParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import Tippy from '@tippyjs/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SubjectIcon from '@mui/icons-material/Subject';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import BallotIcon from '@mui/icons-material/Ballot';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PanelItem from './Panel/PanelItem';

const cx = classNames.bind(styles);

const PANELS = [
    { name: 'Description', icon: <SubjectIcon /> },
    { name: 'About', icon: <VerticalSplitIcon /> },
    {
        name: 'Detail',
        icon: <BallotIcon />,
        content: [
            { title: 'Contract Address', value: '0xde07acd8aa9909aedc995fb1f0a25db27650dc2f' },
            { title: 'Token ID', value: '1' },
            { title: 'Token Standard', value: 'ERC721' },
            { title: 'Creator Fees', value: '0%' },
        ],
    },
];
const cAddress = '0xde07acd8aa9909aedc995fb1f0a25db27650dc2f';

export default function Detail() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('');

    const handleActive = (name) => {
        setActiveTab(name);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-container')}>
                    <Button primary small>
                        Sell
                    </Button>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('left-wrapper')}>
                    <div className={cx('left-container')}>
                        <div className={cx('left-header')}>
                            <Tippy content="Blockchain: Rinkeby">
                                <img className={cx('etherum')} src={images.etherum} alt="Etherum" />
                            </Tippy>
                            <div className={cx('d-flex', 'align-center')}>
                                <span className={cx('favorite-count')}>0</span>
                                <Tippy content="Favorite">
                                    <FavoriteBorderIcon className={cx('favorite-icon')} />
                                </Tippy>
                            </div>
                        </div>
                        <div className={cx('left-media')}>
                            <img
                                src="https://lh3.googleusercontent.com/L-ks9_fCpAmndnpemZhTSGBYptahDCuc6VmDy4l_N9XAhiCCgGh4PJB12WnfhbDEcvkWoih4yQDGwrnelodOrycy0IkfZK_sgsfC1w=w600"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={cx('left-panel')}>
                        {PANELS.map((item, index) => (
                            <PanelItem key={index} data={item} />
                        ))}
                        {/* <div className={cx('panel-item')}>
                            <div className={cx('panel-header')}>
                                <div className={cx('panel-icon')}>
                                    <SubjectIcon />
                                </div>
                                <p className={cx('panel-name')}>Description</p>
                            </div>
                            <div className={cx('panel-content')} style={{ display: 'flex' }}>
                                <span>By you</span>
                                <p>Description</p>
                            </div>
                        </div>
                        <div className={cx('panel-item')}>
                            <div className={cx('panel-header', { active: activeTab })} onClick={handleActive}>
                                <div className={cx('panel-icon')}>
                                    <VerticalSplitIcon />
                                </div>
                                <p className={cx('panel-name')}>About</p>
                                <KeyboardArrowDownIcon className={cx('arrow-down')} />
                            </div>
                            <div className={cx('panel-content')}>
                                <span>By you</span>
                                <p>Description</p>
                            </div>
                        </div>
                        <div className={cx('panel-item')}>
                            <div className={cx('panel-header', { active: activeTab })} onClick={handleActive}>
                                <div className={cx('panel-icon')}>
                                    <BallotIcon />
                                </div>
                                <p className={cx('panel-name')}>Detail</p>
                                <KeyboardArrowDownIcon className={cx('arrow-down')} />
                            </div>
                            <div className={cx('panel-content')}>
                                <div className={cx('detail-item', 'd-flex', 'justify-between')}>
                                    <p>Contract Address</p>
                                    <p>
                                        {cAddress.substring(0, 6)}...{cAddress.substring(cAddress.length - 4)}
                                    </p>
                                </div>
                                <div className={cx('detail-item', 'd-flex', 'justify-between')}>
                                    <p>Token ID</p>
                                    <p>1</p>
                                </div>
                                <div className={cx('detail-item', 'd-flex', 'justify-between')}>
                                    <p>Token Standard</p>
                                    <p>ERC-721</p>
                                </div>
                                <div className={cx('detail-item', 'd-flex', 'justify-between')}>
                                    <p>Blockchain</p>
                                    <p>Rinkeby</p>
                                </div>
                                <div className={cx('detail-item', 'd-flex', 'justify-between')}>
                                    <p>Creator Fees</p>
                                    <p>0%</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className={cx('right')}></div>
            </div>
        </div>
    );
}
