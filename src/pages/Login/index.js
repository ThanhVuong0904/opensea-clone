import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import reactStringReplace from 'react-string-replace';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import images from '~/assets/images';
import { AuthenticateContext } from '~/contexts/AuthenticateContext';
import config from '~/config';

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
    const [renderListConnect, setRenderListConnect] = useState(CONNECTS.slice(0, 4));
    const [isShowMore, setIsShowMore] = useState(false);
    const { connectMetamask, active } = useContext(AuthenticateContext);

    useEffect(() => {
        !isShowMore ? setRenderListConnect(CONNECTS.slice(0, 4)) : setRenderListConnect(CONNECTS);
    }, [isShowMore]);

    const handleToggleShow = () => {
        setIsShowMore(!isShowMore);
    };

    const handleLogin = async (wallet) => {
        if (wallet === 'Metamask') {
            await connectMetamask();
        }
    };
    return (
        <>
            <Helmet>
                <title>Login | OpenSea</title>
            </Helmet>
            {active && <Navigate to={config.routes.account} replace={true} />}
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
                            <div key={index} className={cx('connect-item')} onClick={() => handleLogin(item.name)}>
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
        </>
    );
}
