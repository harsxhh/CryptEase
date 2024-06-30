import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { contractABI, contractAddress } from '../utils/constants';
import axios from 'axios';
import { URL } from '../utils/url';
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
    const [user,setUser]=useState();
    const getUser=async()=>{
        try{
            const res=await axios.get(`${URL}/user`,{
              headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            setUser(res.data.data.user[0]);
         }
         catch(err){
          console.log(err);
         }
    }
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
        getUser();
    }, []);

    return (
        <NFTContext.Provider value={{ connectWallet, connectedAccount ,user}}>
            {children}
        </NFTContext.Provider>
    );
}
