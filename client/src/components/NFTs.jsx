import React, { useState, useEffect } from 'react'
import { URL } from '../utils/url'
import axios from 'axios'
import { toast } from 'react-toastify';
import Header from './Header';
const NFTs = () => {
    const [nfts, setNfts] = useState([]);
    const [sell, setSell] = useState(false);
    const [nftId, setNftId] = useState('');
    useEffect(() => {
        axios.get(`${URL}/nft/getnfts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setNfts(res.data);
        }).catch(err => {
            toast.error('Error fetching NFTs');
            console.log(err);
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const price = e.target[0].value;
        axios.post(`${URL}/nft/sellnft`, { nftId: nftId, price }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            toast.success(res.data.message);
            setSell(false);
        }).catch(err => {
            toast.error(err.response.data.message);
            setSell(false);
            console.log(err);
        });
    }
    const handleSell = (id) => {
        setSell(true);
        setNftId(id);
    }
    return (
        <>
            <Header />
            <div style={{ marginTop: "100px" }}>
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>Your NFTs</h1>
            </div>
            <div className='mt-4' style={{ marginLeft: "200px" }}>
                {nfts.length === 0 && <p className="text-left">No NFTs available</p>}
                {nfts.length > 0 && (
                    <div className="flex flex-wrap justify-start">
                        {nfts.map((nft, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src={`https://gateway.pinata.cloud/ipfs/${nft.cid}`}
                                        alt="nft"
                                        className="w-full h-64 object-cover rounded-md mb-2"
                                    />
                                    <p className="text-lg font-bold mb-2">{nft.cid}</p>
                                    <p className="text-gray-600">A wonderful NFT</p>
                                    <button
                                        onClick={() => handleSell(nft._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                                    >
                                        Sell
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default NFTs
