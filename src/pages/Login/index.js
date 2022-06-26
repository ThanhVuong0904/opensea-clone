import { useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector';

import images from '~/assets/images';
// import { useEagerConnect, useInactiveListener } from '~/hooks/index';

const cx = classNames.bind(styles);
const {
    metamask,
    coinbaseWallet,
    walletConnect,
    phantom,
    glow,
    fortmatic,
    kaikas,
    bitski,
    venly,
    dapper,
    authereum,
    torus,
    portis,
    operaTouch,
    trust,
} = images.login;

const CONNECTS = [
    { name: 'Metamask', icon: metamask, poplular: true },
    { name: 'Coinbase Wallet', icon: coinbaseWallet },
    { name: 'WalletConnect', icon: walletConnect },
    { name: 'Phantom', icon: phantom, solana: true },
    { name: 'Glow', icon: glow, solana: true },
    { name: 'Fortmatic', icon: fortmatic },
    { name: 'Kaikas', icon: kaikas },
    { name: 'Bitski', icon: bitski },
    { name: 'Venly', icon: venly },
    { name: 'Dapper', icon: dapper },
    { name: 'Authereum', icon: authereum },
    { name: 'Torus', icon: torus },
    { name: 'OperaTouch', icon: operaTouch, mobileOnly: true },
    { name: 'Trust', icon: trust, mobileOnly: true },
];

export default function Login() {
    const context = useWeb3React();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [renderListConnect, setRenderListConnect] = useState(CONNECTS.slice(0, 4));
    const [isShowMore, setIsShowMore] = useState(false);
    useEffect(() => {
        !isShowMore ? setRenderListConnect(CONNECTS.slice(0, 4)) : setRenderListConnect(CONNECTS);
    }, [isShowMore]);

    const handleToggleShow = () => {
        setIsShowMore(!isShowMore);
    };
    // function getErrorMessage(error) {
    //     if (error instanceof NoEthereumProviderError) {
    //         return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    //     } else if (error instanceof UnsupportedChainIdError) {
    //         return "You're connected to an unsupported network.";
    //     } else if (
    //         error instanceof UserRejectedRequestErrorInjected ||
    //         error instanceof UserRejectedRequestErrorWalletConnect ||
    //         error instanceof UserRejectedRequestErrorFrame
    //     ) {
    //         return 'Please authorize this website to access your Ethereum account.';
    //     } else {
    //         console.error(error);
    //         return 'An unknown error occurred. Check the console for more details.';
    //     }
    // }
    return (
        <div className={cx('d-flex')}>
            <div className={cx('wrapper')}>
                <h1 className={cx('heading')}>Connect your wallet.</h1>
                <p>
                    {reactStringReplace(
                        'Connect with one of our available wallet providers or create a new one.',
                        'wallet',
                        (match, i) => (
                            <Tippy
                                key={match + i}
                                content="A crypto wallet is an application or hardware device that allows individuals to store and retrieve digital items."
                                interactive
                                placement="bottom"
                            >
                                <span className={cx('highlight')}>{match}</span>
                            </Tippy>
                        ),
                    )}
                </p>
                <div className={cx('connects')}>
                    {renderListConnect.map((item, index) => (
                        <div key={index} className={cx('connect-item')}>
                            <div className={cx('d-flex')}>
                                <img className={cx('icon')} src={item.icon} alt={item.name} />
                                <span className={cx('name')}>{item.name}</span>
                            </div>
                            {item.poplular && <span className={cx('popular')}>Popular</span>}
                            {item.solana && <span className={cx('solana')}>Solana</span>}
                            {item.mobileOnly && <span className={cx('mobile-only')}>mobile only</span>}
                        </div>
                    ))}
                    <div className={cx('toggle-show')} onClick={handleToggleShow}>
                        <span>{!isShowMore ? 'Show more options' : 'Show fewer options'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
