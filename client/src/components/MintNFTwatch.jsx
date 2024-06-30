import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../utils/data';
import { NFTContext } from '../context/NFTcontext';
import { contractABI, contractAddress } from '../utils/constants';
import YouTube from "react-youtube";
import Web3 from 'web3';
import { toast } from 'react-toastify';

const web3 = new Web3(window.ethereum);
const NFTContract = new web3.eth.Contract(contractABI, contractAddress);
let videoElement = null;
const MintNFTwatch = () => {
    const { genre } = useParams();
    const [videos, setVideos] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

    const { connectedAccount } = useContext(NFTContext);
    const [tokenURI, setTokenURI] = useState('');
    const src = 'https://gateway.pinata.cloud/ipfs/QmfD5GoGm62v8t91xxy2UyEo9QkBRT9bM2f2Yg8Uh78Cn7';

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 0,
        },
    };
    const _onReady = (event) => {
        videoElement = event;
    };
    const _onEnd = () => {
        console.log("Video has ended");
        setVideoEnded(true);
        setIsPaused(true);
    };

    const handleMint = async () => {
        if (!connectedAccount) {
            toast.error('Please connect your wallet');
            return;
        }

        try {
            setTokenURI(src);
            await NFTContract.methods.mint(connectedAccount, tokenURI).send({ from: connectedAccount });
            toast.success('NFT minted successfully!');
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
        <div>
            {videos ? (
                <>
                    <div>
                        <h1>Watch a video of {genre} genre</h1>
                    </div>
                    <div>
                        <YouTube
                            className="my-10"
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
                <div>
                    <img src={src} alt="NFT" />
                    <button onClick={handleMint}>Mint NFT</button>
                </div>
            )}
        </div>
    );
};

export default MintNFTwatch;
