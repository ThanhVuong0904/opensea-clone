import { useParams } from 'react-router-dom';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';

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
import { useContext, useEffect, useState } from 'react';
// import { AuthenticateContext } from '~/contexts/AuthenticateContext';

const cx = classNames.bind(styles);

export default function Detail() {
    const Web3Api = useMoralisWeb3Api();
    const { isInitialized } = useMoralis();
    const { address, id } = useParams();
    const DETAIL = [
        { title: 'Contract Address', value: address },
        { title: 'Token ID', value: id },
        { title: 'Token Standard', value: 'ERC721' },
        { title: 'Creator Fees', value: '0%' },
    ];
    // const { library, account } = useContext(AuthenticateContext);
    const [metadata, setMetadata] = useState({});
    const [NFTDetail, setNFTDetail] = useState({});
    useEffect(() => {
        const fetchTokenIdMetadata = async () => {
            const options = {
                address: address,
                token_id: id,
                chain: 'rinkeby',
            };
            const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
            console.log(tokenIdMetadata);
            const metadataParse = JSON.parse(tokenIdMetadata.metadata);
            setMetadata(metadataParse);
            setNFTDetail(tokenIdMetadata);
        };
        isInitialized && address && id && fetchTokenIdMetadata();
    }, [address, id, isInitialized]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-container')}>
                    <Button primary small to={`/sell/${address}/${id}`}>
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
                            <img src={metadata.image} alt={metadata.name} />
                        </div>
                    </div>
                    <div className={cx('left-panel')}>
                        <Panel icon={<SubjectIcon />} title="Description" toggle={false}>
                            <span>
                                By &nbsp;
                                {NFTDetail.owner_of && (
                                    <span className={cx('text')}>
                                        {NFTDetail.owner_of.substring(0, 6)}
                                        ...{NFTDetail.owner_of.substring(NFTDetail.owner_of.length - 4)}
                                    </span>
                                )}
                            </span>
                            <p>{metadata.description}</p>
                        </Panel>
                        <Panel icon={<VerticalSplitIcon />} title="About" toggle>
                            <span>About</span>
                            <p>About</p>
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
                        <h3 className={cx('collection-name')}>{NFTDetail.name}</h3>
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
                    <p className={cx('nft-name')}>{metadata.name}</p>
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
