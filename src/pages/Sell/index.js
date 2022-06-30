import { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sell.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import images from '~/assets/images';

const cx = classNames.bind(styles);

export default function Sell() {
    const Web3Api = useMoralisWeb3Api();
    const { isInitialized } = useMoralis();
    const { address, id } = useParams();
    const [metadata, setMetadata] = useState({});
    const [nameCollection, setNameCollection] = useState('');
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-container')}>
                    <Link to={`/${address}/${id}`}>
                        <ArrowBackIosIcon />
                        <div>
                            <img src={images.etherum} alt="Etherum" />
                        </div>
                        <div>
                            <p>{nameCollection}</p>
                            <p>{metadata.name}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
