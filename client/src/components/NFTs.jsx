import React,{useState,useEffect} from 'react'
import { URL } from '../utils/url'
import axios from 'axios'
import { toast } from 'react-toastify';
const NFTs = () => {
    const [nfts, setNfts] = useState([]);
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
    console.log(nfts);
    return (
        <>
            <div>
                <h1>Your NFTs</h1>
            </div>
            {
                nfts.length === 0 && <p>No NFTs minted</p>
            }
            {nfts.length > 0 && <div>
                {nfts.map((nft, index) => (
                    <div key={index}>
                        <img src={`https://gateway.pinata.cloud/ipfs/${nft.cid}`} alt="nft" />
                        <p>{nft.cid}</p>
                        <p>A wonderful NFT</p>
                    </div>
                ))}
            </div>}
        </>
    )
}

export default NFTs
