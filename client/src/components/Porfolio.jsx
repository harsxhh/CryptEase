import React, { useContext, useState, useEffect } from 'react'
import { NFTContext } from '../context/NFTcontext';
import { URL } from '../utils/url'
import axios from 'axios'
import Header from './Header';
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

    const { connectWallet, connectedAccount } = useContext(NFTContext);
    return (
        <>
            {/* <div>
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
            </div> */}

            <Header/>
            <div class="flex items-center justify-between mb-4" style={{ marginTop: "100px", marginLeft:"150px" }}>
                <div style={{ marginTop: "100px" }}>
                    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>
                        Portfolio For:
                    </h1>
                    <h2 class="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-3xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>Name: {user?.userName || "Name"}</h2>
                    <h2 class="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-3xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>Email: {user?.email || "Email"}</h2>
                </div>
                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-white dark:border-gray-700" style={{ marginLeft: "150px" }}>
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-dark">Latest Statistics</h5>
                    </div>
                    <div class="flow-root">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
                                            Wallet Balance
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        {user?.wallet || 0}
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center ">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
                                            Total Loan Withdrawn
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        {user?.loan || 0}
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center ">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Lana image" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
                                            Total Investments
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        {investments.length === 0 && <div>
                                            <p>No Investments</p>
                                            <Link to='/invest' style={{ color: "blue" }}>Invest Now</Link>
                                        </div>}
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center ">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
                                            NFT's Minted
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        {nfts.length === 0 && <div>
                                            <p>No NFTs minted</p>
                                            <Link to='/mintnft' style={{ color: "blue" }}><button>Mint Now</button></Link>
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Porfolio
