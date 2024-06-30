import React,{useState,useEffect} from 'react'
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
        axios.post(`${URL}/nft/sellnft`, { nftId:nftId, price }, {
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
            <div style={{marginTop:"100px"}}>
                <h1 h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-4xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>Your NFTs</h1>
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
                        <button onClick={()=>handleSell(nft._id)}> Sell NFT</button>
                         {sell &&
                          <div>
                            <p>
                                Do you really want to sell this NFT?
                            </p>
                            <form onSubmit={handleSubmit}> 
                            <label>Price</label>
                            <input type="number" placeholder="Enter price" />
                            <button type='submit'>Sell</button>
                            </form>
                            <button onClick={()=>setSell(false)}>Cancel</button>
                          </div>
                         }
                    </div>
                ))}
            </div>}
        </>
    )
}

export default NFTs
