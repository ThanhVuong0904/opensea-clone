import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from '~/components/GlobalStyle';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import AuthenticateContextProvider from '~/contexts/AuthenticateContext';
import { MoralisProvider } from 'react-moralis';
function getLibrary(provider) {
    const library = new Web3Provider(provider);
    // library.pollingInterval = 8000;
    return library;
}
console.log(process.env.REACT_APP_APP_ID);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <MoralisProvider appId={process.env.REACT_APP_APP_ID} serverUrl={process.env.REACT_APP_SERVER_URL}>
                <AuthenticateContextProvider>
                    <GlobalStyle>
                        <App />
                    </GlobalStyle>
                </AuthenticateContextProvider>
            </MoralisProvider>
        </Web3ReactProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
