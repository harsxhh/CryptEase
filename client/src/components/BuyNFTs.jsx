import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { URL } from '../utils/url'
import { toast } from 'react-toastify'
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
            const res=await axios.post(`${URL}/nft/buynft`, { nftId: nft._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.status===200){
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
        <div>
            <h1>Buy NFTs</h1>
        </div>
        {
            nfts.length === 0 && <p>No NFTs available to Buy</p>
        }
        {
            nfts.length > 0 && <div>
            {
                nfts.map((nft, index) => (
                <div key={index}>
                    <img src={`https://gateway.pinata.cloud/ipfs/${nft.cid}`} alt="nft" />
                    <p>{nft.cid}</p>
                    <p>A wonderful NFT</p>
                    <button onClick={()=>handleBuy(nft)}>Buy NFT</button>
                </div>
                ))
            }
            </div>
        }
    </>
  )
}

export default BuyNFTs
