import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import Tippy from '@tippyjs/react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SubjectIcon from '@mui/icons-material/Subject';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import BallotIcon from '@mui/icons-material/Ballot';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TocIcon from '@mui/icons-material/Toc';

import Panel from '~/components/Panel';

const cx = classNames.bind(styles);

const DETAIL = [
    { title: 'Contract Address', value: '0xde07acd8aa9909aedc995fb1f0a25db27650dc2f' },
    { title: 'Token ID', value: '1' },
    { title: 'Token Standard', value: 'ERC721' },
    { title: 'Creator Fees', value: '0%' },
];

export default function Detail() {
    const { id } = useParams();

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
                        <Panel icon={<SubjectIcon />} title="Description" toggle={false}>
                            <span>By you</span>
                            <p>Description</p>
                        </Panel>
                        <Panel icon={<VerticalSplitIcon />} title="About" toggle>
                            <span>By you</span>
                            <p>Description</p>
                        </Panel>
                        <Panel icon={<BallotIcon />} title="Detail" toggle>
                            {DETAIL.map((item, index) => (
                                <div key={index} className={cx('detail-item', 'd-flex', 'justify-between')}>
                                    {item.title === 'Contract Address' ? (
                                        <>
                                            <p>{item.title}</p>
                                            <p>
                                                {item.value.substring(0, 6)}...
                                                {item.value.substring(item.value.length - 4)}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p>{item.title}</p>
                                            <p>{item.value}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </Panel>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('right-header', 'd-flex', 'align-center', 'justify-between')}>
                        <h3 className={cx('collection-name')}>ThanhVuong</h3>
                        <div className={cx('toolbar')}>
                            <Tippy content="Refresh metadata">
                                <button className={cx('toolbar-item')}>
                                    <RefreshIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Refresh metadata">
                                <button className={cx('toolbar-item')}>
                                    <ShareIcon />
                                </button>
                            </Tippy>
                            <Tippy content="More">
                                <button className={cx('toolbar-item')}>
                                    <MoreVertIcon />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    <p className={cx('nft-name')}>NFT-Name</p>
                    <div className={cx('nft-count', 'd-flex', 'align-center')}>
                        <p>
                            Owned by <span>20B8D1</span>
                        </p>
                        <VisibilityIcon /> 3 views
                    </div>
                    <div className={cx('right-panel')}>
                        <div className={cx('right-panel-item')}>
                            <Panel icon={<TimelineIcon />} title="Price History" toggle>
                                <div
                                    className={cx('d-flex', 'align-center', 'justify-center')}
                                    style={{ flexDirection: 'column' }}
                                >
                                    <img src="https://testnets.opensea.io/static/images/no-chart-data.svg" alt="" />
                                    <p>No item activity yet</p>
                                </div>
                            </Panel>
                        </div>
                        <div className={cx('right-panel-item')}>
                            <Panel icon={<LocalOfferIcon />} title="Listing" toggle>
                                <div
                                    className={cx('d-flex', 'align-center', 'justify-center')}
                                    style={{ flexDirection: 'column' }}
                                >
                                    <img src="https://testnets.opensea.io/static/images/empty-asks.svg" alt="" />
                                    <p>No listings yet</p>
                                </div>
                            </Panel>
                        </div>
                        <div className={cx('right-panel-item')}>
                            <Panel icon={<TocIcon />} title="Offers" toggle>
                                <div
                                    className={cx('d-flex', 'align-center', 'justify-center')}
                                    style={{ flexDirection: 'column' }}
                                >
                                    <img src="https://testnets.opensea.io/static/images/empty-asks.svg" alt="" />
                                    <p>No offers yet</p>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
