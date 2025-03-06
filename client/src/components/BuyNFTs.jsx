import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from '../utils/url'
import { toast } from 'react-toastify'
import Header from './Header'
const BuyNFTs = () => {
    const [nfts, setNfts] = useState([]);
    const getnfts = async () => {
        try {
            const res = await axios.get(`${URL}/nft/buynft`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNfts(res.data);
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        }
    }
    useEffect(() => {
        getnfts();
    }, []);

    const handleBuy = async (nft) => {
        try {
            const res = await axios.post(`${URL}/nft/buynft`, { nftId: nft._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                getnfts();
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error buying NFT:', error);
        }
    }
    return (
        <>
            <Header />
            <div style={{ marginTop: "100px" }}>
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>Buy NFTs</h1>
            </div>
            <div className="mt-4" style={{marginLeft:"200px"}}>
                {nfts.length === 0 && <p className="text-left">No NFTs available to Buy</p>}
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
                                    <p className="text-lg font-bold mb-2">{nft.cid.slice(0,18)+'...'}</p>
                                    <p className="text-gray-600">A wonderful NFT</p>
                                    <button
                                        onClick={() => handleBuy(nft)}
                                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Buy NFT
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

export default BuyNFTs
