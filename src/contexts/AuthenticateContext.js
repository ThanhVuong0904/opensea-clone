import { useWeb3React } from '@web3-react/core';
import { createContext } from 'react';
// import { METAMASK } from '~/constants/authConstant';

import { connectors } from '~/utils/connector';
import { useMoralis } from 'react-moralis';
// import config from '~/config';

export const AuthenticateContext = createContext();

function AuthenticateContextProvider({ children }) {
    const context = useWeb3React();
    const { library, account, activate, deactivate, active, error } = context;
    const { authenticate, isAuthenticated, logout } = useMoralis();

    const connectMetamask = async () => {
        try {
            await activate(connectors.injected);
            console.log('call');
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
        account,
        active,
        library,
    };
    return <AuthenticateContext.Provider value={state}>{children}</AuthenticateContext.Provider>;
}

export default AuthenticateContextProvider;
