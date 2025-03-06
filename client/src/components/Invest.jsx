import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { NFTContext } from '../context/NFTcontext';
import { URL } from '../utils/url';
import { contractABI, contractAddress } from '../utils/constants';
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
const NFTContract = new web3.eth.Contract(contractABI, contractAddress);

const Invest = () => {
    const history = useNavigate();
    const { connectedAccount, user } = useContext(NFTContext);

    const [invest, setInvest] = useState({
        coinName: 'Bitcoin',
        amount: '',
        duration: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInvest({ ...invest, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (invest.amount <= 0 || invest.duration <= 0) {
                toast.error('Please enter a valid amount and duration');
                return;
            }

            const amountInWei = web3.utils.toWei(invest.amount.toString(), 'ether');

            if (user.wallet < invest.amount) {
                toast.error('Insufficient funds');
                return;
            }

            if (!connectedAccount) {
                toast.error('Please connect your wallet');
                return;
            }

            const res = await NFTContract.methods.invest(invest.coinName, amountInWei, invest.duration).send({ from: connectedAccount });

            if (res) {
                try {
                    const response = await axios.post(`${URL}/user/invest`, invest, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (response.status === 200) {
                        toast.success('Investment successful');
                        history('/invested');
                    }
                } catch (error) {
                    toast.error('Error investing:', error);
                    console.error('Error investing:', error);
                }
            }
        } catch (error) {
            toast.error('Error investing:', error);
            console.error('Error investing:', error);
        }
    };

    const coinOptions = [
        'Bitcoin', 'Ethereum', 'Litecoin', 'Dogecoin', 'Ripple', 'Cardano',
        'Polkadot', 'Uniswap', 'Chainlink', 'Stellar', 'Bitcoin Cash', 'Binance Coin'
    ];

    return (
        <>
            <Header />
            <div className="container mx-auto mt-40">
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold text-gray-800">Invest</h1>
                    </div>
                    <div className="p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="coinName" className="block text-sm font-medium text-gray-700">Coin Name</label>
                                <select
                                    id="coinName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={invest.coinName}
                                    onChange={handleChange}
                                >
                                    {coinOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Amount in dollars"
                                    value={invest.amount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                                <input
                                    type="number"
                                    id="duration"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter Duration in years"
                                    value={invest.duration}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Invest
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invest;
