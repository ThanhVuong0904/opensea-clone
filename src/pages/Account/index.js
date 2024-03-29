import { useContext, useEffect, useRef, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';

import { Helmet } from 'react-helmet';
import { AuthenticateContext } from '~/contexts/AuthenticateContext';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import images from '~/assets/images';

import NFTItem from '~/components/NFT/NFTItem';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WindowIcon from '@mui/icons-material/Window';
import GridOnIcon from '@mui/icons-material/GridOn';
import { NFT_ADDRESS } from '~/constants/address';
const cx = classNames.bind(styles);

const TABS = ['Collected', 'Created', 'Favorited', 'Activity', 'More'];

export default function Account() {
    const Web3Api = useMoralisWeb3Api();
    const { account, getItemSell } = useContext(AuthenticateContext);
    const [activeTab, setActiveTab] = useState('Collected');
    const [myNFTs, setMyNFTs] = useState([]);

    const searchRef = useRef();

    useEffect(() => {
        const fetchNFTsForContract = async () => {
            const options = {
                chain: 'rinkeby',
                address: account,
                token_address: NFT_ADDRESS,
            };
            const nfts = await Web3Api.account.getNFTsForContract(options);
            console.log('mynfts', nfts);
            //Get NFT on sell in marketplace
            const itemSells = await getItemSell();
            nfts.result.map((nft) => {
                setMyNFTs([]);
                let nftInMarket = itemSells.find(
                    (listing) => listing.tokenId.toString() === nft.token_id.toString() && listing,
                );
                return setMyNFTs((prev) => [
                    ...prev,
                    {
                        token_id: nft.token_id,
                        token_address: nft.token_address,
                        metadata: nft.metadata,
                        name: nft.name,
                        isSold: nftInMarket !== undefined && nftInMarket.isSold,
                        price: nftInMarket !== undefined && nftInMarket.askingPrice.toString(),
                    },
                ]);
            });
        };
        account && fetchNFTsForContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Your Profile | OpenSea</title>
            </Helmet>
            <div className={cx('background')}>
                <img src={images.bgUser} alt="User" />
                <div className={cx('avatar')}>
                    <img src={images.bgUser} alt="User" />
                </div>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('username')}>Unnamed</h1>
                <div className={cx('d-flex', 'align-center')}>
                    <img className={cx('ethereum')} src={images.etherum} alt="Ethereum" />
                    <span className={cx('address-account')}>
                        {account.substring(0, 6)}...{account.substring(account.length - 4)}
                    </span>
                    <span className={cx('time-join')}>Joined June 2022</span>
                </div>

                <div className={cx('tabs')}>
                    {TABS.map((tab, index) => (
                        <div
                            key={index}
                            className={cx('tab', { active: activeTab === tab })}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span>{tab}</span>
                        </div>
                    ))}
                </div>

                <div className={cx('filter', 'd-flex', 'align-center')}>
                    <div className={cx('filter-icon', 'd-flex', 'align-center', 'justify-center')}>
                        <FilterListIcon className={cx('icon')} />
                    </div>
                    <div
                        className={cx('search', 'd-flex', 'align-center', 'border')}
                        onClick={() => searchRef.current.focus()}
                    >
                        <SearchOutlinedIcon className={cx('icon')} />
                        <input type="text" placeholder="Search by name" ref={searchRef} />
                    </div>
                    <div className={cx('recently-received', 'border', 'd-flex', 'align-center')}>
                        <span>Recently received</span>
                        <KeyboardArrowDownIcon className={cx('icon')} />
                    </div>
                    <div className={cx('window-grid-icon', 'd-flex', 'align-center')}>
                        <div className={cx('window')}>
                            <WindowIcon style={{ width: '2.2rem', height: '2.2rem' }} />
                        </div>
                        <div className={cx('grid')}>
                            <GridOnIcon style={{ width: '2.2rem', height: '2.2rem' }} />
                        </div>
                    </div>
                </div>
                <div className={cx('list-nft')}>
                    {myNFTs.map((nft, index) => (
                        <NFTItem
                            key={index}
                            id={nft.token_id}
                            address={nft.token_address}
                            name={nft.name}
                            price={nft.price}
                            isSold={nft.isSold}
                            metadata={JSON.parse(nft.metadata)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
