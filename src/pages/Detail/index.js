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
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import Panel from '~/components/Panel';
import { useContext, useEffect, useState } from 'react';
import { AuthenticateContext } from '~/contexts/AuthenticateContext';
import { MARKET_ADDRESS } from '~/constants/address';
import { MarketAbi } from '~/abi';
import { ethers } from 'ethers';

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
    const { getItemSell, account, active, connectMetamask, library } = useContext(AuthenticateContext);
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
            const allItemSell = await getItemSell();
            const findItemSellMatchID = allItemSell.find((nft) => nft.tokenId.toString() === id.toString());
            console.log(findItemSellMatchID);
            setNFTDetail({
                token_address: tokenIdMetadata.token_address,
                token_id: id,
                owner_of: tokenIdMetadata.owner_of,
                price: findItemSellMatchID !== undefined && findItemSellMatchID[1],
                seller: findItemSellMatchID !== undefined && findItemSellMatchID[3],
                isSold: findItemSellMatchID !== undefined && findItemSellMatchID[4],
            });
        };
        isInitialized && address && id && fetchTokenIdMetadata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, id, isInitialized]);

    const handleLogin = async () => {
        await connectMetamask();
    };

    const handleCancelItem = async () => {
        const signer = library.getSigner();
        const contractMarket = new ethers.Contract(MARKET_ADDRESS, MarketAbi, signer);
        try {
            await contractMarket.cancelItem(address, id);
        } catch (err) {
            console.log(err);
        }
    };
    const handleBuy = async () => {
        const signer = library.getSigner();
        const contractMarket = new ethers.Contract(MARKET_ADDRESS, MarketAbi, signer);
        try {
            await contractMarket.buyItem(address, id, { value: NFTDetail.price });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={cx('wrapper')}>
            {active && account === NFTDetail.seller && (
                <div className={cx('header')}>
                    <div className={cx('header-container')}>
                        {NFTDetail.isSold && (
                            <Button outline small onClick={handleCancelItem}>
                                Cancel listing
                            </Button>
                        )}
                        <Button primary small to={`/sell/${address}/${id}`}>
                            Sell
                        </Button>
                    </div>
                </div>
            )}

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
                            {NFTDetail.isSold && (
                                <Panel
                                    icon={<ScheduleIcon />}
                                    title="Sale ends August 3, 2022 at 8:44pm GMT+7 "
                                    toggle={false}
                                >
                                    <div
                                        className={cx('d-flex', 'justify-center', 'align-start')}
                                        style={{ flexDirection: 'column' }}
                                    >
                                        <p className={cx('txt-second-fw500 fz-14')}>Current price</p>
                                        <div className={cx('d-flex', 'align-center')} style={{ margin: '5px 0' }}>
                                            <img style={{ width: 24, height: 24 }} src={images.etherum} alt="Etherum" />
                                            <p className={cx('txt-pri-fw600 fz-30')}>
                                                {(NFTDetail.price / 1e18).toFixed(4)}
                                            </p>
                                        </div>
                                        {account === NFTDetail.seller && (
                                            <Tippy content="You own this item">
                                                <Button
                                                    primary
                                                    leftIcon={
                                                        <AccountBalanceWalletIcon style={{ fontSize: '2.2rem' }} />
                                                    }
                                                    disabled
                                                >
                                                    Buy now
                                                </Button>
                                            </Tippy>
                                        )}
                                        {/* If user didn't active */}
                                        {active && account !== NFTDetail.seller && (
                                            <Button
                                                primary
                                                leftIcon={<AccountBalanceWalletIcon style={{ fontSize: '2.2rem' }} />}
                                                onClick={handleBuy}
                                            >
                                                Buy now
                                            </Button>
                                        )}
                                        {!active && (
                                            <Button
                                                primary
                                                leftIcon={<AccountBalanceWalletIcon style={{ fontSize: '2.2rem' }} />}
                                                onClick={handleLogin}
                                            >
                                                Login
                                            </Button>
                                        )}
                                    </div>
                                </Panel>
                            )}
                        </div>
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
