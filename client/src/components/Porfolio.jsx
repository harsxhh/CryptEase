import React, { useContext, useState, useEffect } from 'react'
import { NFTContext } from '../context/NFTcontext';
import { URL } from '../utils/url'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Porfolio = () => {
    const { user } = useContext(NFTContext);
    console.log(user);
    const [nfts, setNfts] = useState([]);
    const [investments, setInvestments] = useState([]);
    const getNfts = () => {
        axios.get(`${URL}/nft/getnfts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setNfts(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
    const getInvestments = () => {
        axios.get(`${URL}/user/invest`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const data = res.data.investments.slice(0, 4);
                setInvestments(data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getInvestments();
        getNfts();
    }, []);
    return (
        <>
            <div>
                <div>
                    <h1>Porfolio</h1>
                </div>
                <div>
                    <h2>{user?.userName}</h2>
                    <h2>{user?.email}</h2>
                </div>
                <div>
                    <h2>Wallet Balance :  {user?.wallet} </h2>
                </div>
                <div>
                    <h2>Loan</h2>
                    <p>Loan Amount: {user?.loan}</p>
                    <Link to='/loan'>Pay Now</Link>
                </div>
                <div>
                    <h2>My Investments</h2>
                    {investments.length === 0 && <div>
                        <p>No Investments</p>
                        <Link to='/invest'>Invest Now</Link>
                    </div>}
                    {
                        investments.length > 0 &&
                        <div className="row">
                            <div className="col-md-6">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Coin Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {investments?.map((investment) => {
                                            return <tr>
                                                <td>{investment?.coinName}</td>
                                                <td>{investment?.amount}</td>
                                                <td>{investment?.duration} year</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    <Link to='/invested'>View All Investments</Link>

                </div>
                <div>
                    <h2>My NFTs</h2>
                    {nfts.length === 0 && <div>
                        <p>No NFTs minted</p>
                        <Link to='/mintnft'><button>Mint Now</button></Link>
                    </div>}
                    {nfts.length > 0 && <div>
                        {nfts.map((nft, index) => {
                            return (
                                <div key={index}>
                                    <img src={`https://gateway.pinata.cloud/ipfs/${nft.cid}`} alt="nft" />
                                    <p>{nft.cid}</p>
                                </div>
                            );
                        })}
                        <Link to='/nfts'><button>View All Your NFTs</button></Link>
                    </div>}
                </div>
            </div>

        </>
    )
}

export default Porfolio
