import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { URL } from '../utils/url';

const Investments = () => {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/user/invest`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setInvestments(response.data.investments);
            } catch (error) {
                console.error('Error fetching investments:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-20 mt-40">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>
                        My Investments
                    </h1>
                </div>

                <div className="mt-8">
                    {investments.length === 0 ? (
                        <p className="text-center">No investments available</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {investments.map((investment, index) => (
                                        <tr key={index} className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap text-left">{investment.coinName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left">{investment.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left">{investment.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Investments;
