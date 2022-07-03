import { useContext, useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sell.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '~/components/Button';
import images from '~/assets/images';
import Tippy from '@tippyjs/react';
import { MarketAbi, NFTAbi } from '~/abi';
import { AuthenticateContext } from '~/contexts/AuthenticateContext';
import { ethers } from 'ethers';

const cx = classNames.bind(styles);

export default function Sell() {
    const Web3Api = useMoralisWeb3Api();
    const { isInitialized } = useMoralis();
    const { address, id } = useParams();
    const { library, active, connectMetamask, account } = useContext(AuthenticateContext);

    const [metadata, setMetadata] = useState({});
    const [nameCollection, setNameCollection] = useState('');
    const [price, setPrice] = useState('');
    useEffect(() => {
        const fetchTokenIdMetadata = async () => {
            const options = {
                address: address,
                token_id: id,
                chain: 'rinkeby',
            };
            const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
            const metadataParse = JSON.parse(tokenIdMetadata.metadata);
            setMetadata(metadataParse);
            setNameCollection(tokenIdMetadata.name);
        };
        isInitialized && address && id && fetchTokenIdMetadata();
    }, [address, id, isInitialized]);

    const checkApproved = async () => {
        const signer = library.getSigner();
        //MarketContract
        const contractAddress = '0xf3336b2D76C4d9c318e55210b736831502CA0989';
        const contract = new ethers.Contract(address, NFTAbi, signer);
        try {
            if (contract.isApprovedForAll(account, contractAddress)) await contract.setApprovedForAll();
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async () => {
        const signer = library.getSigner();
        const contractAddressMarket = '0xf3336b2D76C4d9c318e55210b736831502CA0989';
        const contractMarket = new ethers.Contract(contractAddressMarket, MarketAbi, signer);

        const contractNFT = new ethers.Contract(address, NFTAbi, signer);
        try {
            const isApproved = await contractNFT.isApprovedForAll(account, contractAddressMarket);
            if (!isApproved) {
                await contractNFT.setApprovalForAll(contractAddressMarket, true);
                await contractMarket.addItemToMarket(id, price * 10 ** 18, address);
            } else {
                await contractMarket.addItemToMarket(id, price * 10 ** 18, address);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleLogin = async () => {
        await connectMetamask();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-container')}>
                    <Link to={`/${address}/${id}`} className={cx('d-flex', 'align-center')}>
                        <ArrowBackIosIcon />
                        <div className={cx('image-nft')}>
                            <img src={metadata.image} alt={metadata.name} />
                        </div>
                        <div>
                            <p className={cx('name-collection')}>{nameCollection}</p>
                            <p className={cx('name-nft')}>{metadata.name}</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <h3>List item for sale</h3>
                    <div className={cx('sell-list')}>
                        <div className={cx('sell-item')}>
                            <div className={cx('sell-item-header', 'd-flex', 'align-center', 'justify-between')}>
                                <p>Price</p>
                                <Tippy content="List price and listing schedule cannot be edited once the item is listed. You will need to cancel your listing and relist the item with the updated price and dates.">
                                    <InfoOutlinedIcon />
                                </Tippy>
                            </div>
                            <div className={cx('sell-item-body', 'd-flex', 'justify-between')}>
                                <div className={cx('ethereum', 'd-flex', 'align-center')}>
                                    <img src={images.etherum} alt="Etherum" />
                                    <span>ETH</span>
                                </div>
                                <input
                                    type="text"
                                    className={cx('price')}
                                    placeholder="Amount"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {active && (
                        <Button primary onClick={handleBuy}>
                            Complete listing
                        </Button>
                    )}
                    {!active && (
                        <Button primary onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </div>

                <div className={cx('right')}>
                    <div className={cx('nft')}>
                        <img src={metadata.image} alt={metadata.name} />
                        <div className={cx('nft-info')}>
                            <div className={cx('d-flex', 'align-center', 'justify-between')}>
                                <p className={cx('txt-second-fw500', 'fz-12')}>{nameCollection}</p>
                                <p className={cx('txt-second-fw500', 'fz-12')}>Price</p>
                            </div>
                            <div className={cx('d-flex', 'align-center', 'justify-between')}>
                                <p className={cx('txt-pri-fw600', 'fz-12')}>{metadata.name}</p>
                                <div className={cx('d-flex', 'align-center', 'justify-between')}>
                                    <img
                                        style={{ width: 16, height: 16, marginRight: 5 }}
                                        src={images.etherum}
                                        alt="Etherum"
                                    />
                                    <span className={cx('txt-pri-fw600', 'fz-14')}>{price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
