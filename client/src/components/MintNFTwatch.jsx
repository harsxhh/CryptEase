import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { data, CID } from '../utils/data';
import { NFTContext } from '../context/NFTcontext';
import { contractABI, contractAddress } from '../utils/constants';
import YouTube from "react-youtube";
import Web3 from 'web3';
import { toast } from 'react-toastify';
import { URL } from '../utils/url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const web3 = new Web3(window.ethereum);
const NFTContract = new web3.eth.Contract(contractABI, contractAddress);

const MintNFTwatch = () => {
    const navigate = useNavigate();
    const { genre } = useParams();
    const { connectedAccount } = useContext(NFTContext);

    const [videos, setVideos] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [cid, setCID] = useState('');

    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 0,
        },
    };

    const _onReady = (event) => {
        // Access to player in all event handlers via event.target
    };

    const _onEnd = () => {
        setVideoEnded(true);
        setIsPaused(true);
        const index = Math.floor(Math.random() * CID.length);
        setCID(CID[index]);
    };

    const handleMint = async () => {
        if (!connectedAccount) {
            toast.error('Please connect your wallet');
            return;
        }

        try {
            const res = await NFTContract.methods.mint(connectedAccount, cid).send({ from: connectedAccount });
            if (res) {
                try {
                    const res = await axios.post(`${URL}/nft/mintnft`, { cid: cid }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (res.status === 201) {
                        toast.success('NFT minted successfully');
                        setTimeout(() => {
                            navigate('/nfts');
                        }, 1400);
                    }
                } catch (err) {
                    toast.error('Error minting NFT');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Error minting NFT');
        }
    };

    const getVideos = async () => {
        try {
            const foundVideo = data.find(item => item.title === genre);
            if (foundVideo) {
                setVideos(foundVideo);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <Header />
            <div className=" flex flex-col items-center justify-center h-screen">
                {videos ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Watch a video of {genre} genre</h1>
                        <div className="w-full md:w-2/3 lg:w-1/2">
                            <YouTube
                                className="w-full"
                                videoId={videos?.url}
                                opts={opts}
                                onReady={_onReady}
                                onEnd={_onEnd}
                            />
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}

                {videoEnded && (
                    <div className="mt-6 mx-[40%] flex flex-col">
                        <img src={`https://gateway.pinata.cloud/ipfs/${cid}`} alt="NFT" className="rounded-lg shadow-md w-[100%] h-auto mb-4" />
                        <button onClick={handleMint} className="bg-blue-500 hover:bg-blue-700 w-40 mx-10 text-white font-bold py-2 px-4 rounded">
                            Mint NFT
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MintNFTwatch;
