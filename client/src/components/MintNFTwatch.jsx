import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { data,CID } from '../utils/data';
import { NFTContext } from '../context/NFTcontext';
import { contractABI, contractAddress } from '../utils/constants';
import YouTube from "react-youtube";
import Web3 from 'web3';
import { toast } from 'react-toastify';
import {URL} from '../utils/url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
const web3 = new Web3(window.ethereum);
const NFTContract = new web3.eth.Contract(contractABI, contractAddress);
let videoElement = null;
const MintNFTwatch = () => {
    const navigate=useNavigate();
    const { genre } = useParams();
    const [videos, setVideos] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const { connectedAccount } = useContext(NFTContext);
    console.log(connectedAccount);
    const [cid, setCID] = useState('');
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
        const index=Math.random()*CID.length+1;
        setCID(CID[Math.floor(index)]);
    };

    const handleMint = async () => {
        if (!connectedAccount) {
            toast.error('Please connect your wallet');
            return;
        }

        try {
            const res=await NFTContract.methods.mint(connectedAccount, cid).send({ from: connectedAccount });
            if (res) {
                try{
                  const res=await axios.post(`${URL}/nft/mintnft`,{cid:cid},{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  });
                  if(res.status===201){
                    toast.success('NFT minted successfully');
                    setTimeout(()=>{
                      navigate('/nfts')
                    },1400)
                  }
                }
                catch(err){
                    toast.error('Error minting NFT');
                    console.log(res);
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


    return (<>
    <Header />
        <div style={{marginTop:"100px"}}>
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
                    <img src={`https://gateway.pinata.cloud/ipfs/${cid}`} alt="NFT" />
                    <button onClick={handleMint}>Mint NFT</button>
                </div>
            )}
        </div></>
    );
};

export default MintNFTwatch;
