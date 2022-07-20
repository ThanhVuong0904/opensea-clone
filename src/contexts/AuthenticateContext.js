import { useWeb3React } from '@web3-react/core';
import { createContext } from 'react';

import { connectors } from '~/utils/connector';
import { useMoralis } from 'react-moralis';
import { MARKET_ADDRESS } from '~/constants/address';
import { MarketAbi } from '~/abi';

import Web3 from 'web3';

export const AuthenticateContext = createContext();

function AuthenticateContextProvider({ children }) {
    const context = useWeb3React();
    const { library, account, activate, active } = context;
    const { authenticate, isAuthenticated } = useMoralis();

    const getItemSell = async () => {
        const web3 = new Web3(window.ethereum);
        // const signer = library.getSigner();
        const contractMarket = new web3.eth.Contract(MarketAbi, MARKET_ADDRESS);
        console.log(contractMarket);
        const result = await contractMarket.methods.getItems().call();
        return result;
    };
    const connectMetamask = async () => {
        try {
            const alo = await activate(connectors.injected);
            console.log('call', alo);
            if (!isAuthenticated) {
                await authenticate({ signingMessage: 'Log in using Moralis' })
                    .then(function (user) {
                        console.log('logged in user:', user);
                        console.log(user.get('ethAddress'));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    const state = {
        connectMetamask,
        getItemSell,
        account,
        active,
        library,
    };
    return <AuthenticateContext.Provider value={state}>{children}</AuthenticateContext.Provider>;
}

export default AuthenticateContextProvider;
