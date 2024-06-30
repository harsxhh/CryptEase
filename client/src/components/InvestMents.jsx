import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from './Header';
import { URL } from '../utils/url'
const InvestMents = () => {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(`${URL}/user/invest`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    console.log(res.data)
                    setInvestments(res.data.investments)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchData();
    }, [])
    console.log(investments)
    return (
        <>
            <Header />
            <div className="container ml-30%" style={{ marginTop: "100px" }}>
                <div style={{ marginTop: "100px" }}>
                    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>Buy NFTs</h1>
                </div>
                <div className='mt-4' style={{ marginLeft: "200px" }}>
                    {investments.length === 0 && <p className="text-left">No Investments available</p>}
                    {investments.length > 0 && (
                        <div className="flex flex-wrap justify-start">
                            {investments.map((investment, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
                                    <div className="bg-white rounded-lg shadow-md p-4">
                                        <p className="text-lg font-bold mb-2">Investment: {investment.coinName}</p>
                                        <p className="text-gray-600">Amount: {investment.amount}</p>
                                        <p className="text-gray-600">Duration: {investment.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default InvestMents
