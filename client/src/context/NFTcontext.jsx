import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { contractABI, contractAddress } from '../utils/constants';

export const NFTContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
}

export const NFTProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState(null);

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return toast.error("Please install MetaMask");
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            setConnectedAccount(accounts[0]);
        }
    };

    const connectWallet = () => {
        if (!ethereum) return toast.error("Please install MetaMask");
        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                setConnectedAccount(accounts[0]);
            })
            .catch(err => toast.error(err.message));
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <NFTContext.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </NFTContext.Provider>
    );
}
