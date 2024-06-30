import React, { useContext, useState, useEffect } from 'react';
import { NFTContext } from '../context/NFTcontext';

function Dashboard3() {
    const [showPopover, setShowPopover] = useState(true);
    const { connectWallet, connectedAccount } = useContext(NFTContext);

    useEffect(() => {
        // Check if there is a connected account in local storage
        const localStorageConnectedAccount = localStorage.getItem('connectedAccount');
        if (localStorageConnectedAccount) {
            setShowPopover(false); // Hide popover if account is already connected
        }
    }, []);

    const handleConnectWallet = () => {
        connectWallet(); // Call context function to connect wallet
        setShowPopover(false); // Hide popover after attempting to connect

        // Store connected account in local storage
        localStorage.setItem('connectedAccount', connectedAccount);
    };

    return (
        <div>
            {/* Header section */}
            <header style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                position: "fixed",
                width: "100vw",
                top: 0,
                zIndex: 1000,
                fontFamily: "Roboto Mono",
                backgroundColor: "#ffffff",  // Adjust background color as needed
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"  // Optional: Add shadow for visual separation
            }}>
                <div style={{ padding: "15px 30px" }}>
                    <h1 style={{ fontSize: "30px", margin: 0 }}>FinteX</h1>
                </div>
                <nav style={{ display: "flex", alignItems: "center", padding: "15px 30px" }}>
                    <a style={{ margin: "0 15px", textDecoration: "none", color: "#333", fontWeight: "500" }} href="#">PORTFOLIO</a>
                    <a style={{ margin: "0 15px", textDecoration: "none", color: "#333", fontWeight: "500" }} href="#">DEPOSIT</a>
                    <a style={{ margin: "0 15px", textDecoration: "none", color: "#333", fontWeight: "500" }} href="#">LOAN</a>
                    <a style={{ margin: "0 15px", textDecoration: "none", color: "#333", fontWeight: "500" }} href="#">INVEST</a>
                    <a style={{ margin: "0 15px", textDecoration: "none", color: "#333", fontWeight: "500" }} href="#">NFT's</a>
                </nav>
                <div>
                    <p>Welcome</p>
                </div>
            </header>

            {/* Popover section */}
            {showPopover && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
                        <div className="flex items-center space-x-4 mb-4">
                            <img src="company-logo.png" alt="Company Logo" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Company Name</p>
                                <p className="text-sm text-gray-600">Connect your wallet to proceed.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleConnectWallet} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                                Yes, connect wallet
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {connectedAccount && (<><div style={{ margin: "50px 0 0 150px", borderRadius: "25px" }}>
                {/* display in a box the details of connected account */}
                <div style={{ display: "flex", justifyContent: "space-between", margin: "80px 0", fontFamily: "Roboto Mono", border: "black" }}>
                    <h4>Connected Account: {connectedAccount}</h4>
                </div>
            </div>
                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-white dark:border-gray-700" style={{ marginLeft: "150px" }}>
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-dark">Latest Statistics</h5>
                        {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
        View all
    </a> */}
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
                                            Total Amount Wagered
                                        </p>
                                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        email@windster.com
    </p> */}
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        $320
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
                                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        email@windster.com
    </p> */}
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Michael image" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
                                            Total Deposit Made
                                        </p>
                                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        email@windster.com
    </p> */}
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        $67
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
                                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        email@windster.com
    </p> */}
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        $367
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
                                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        email@windster.com
    </p> */}
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        $2367
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center ">
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image" />
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
                                            NFT's Sold
                                        </p>
                                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        email@windster.com
    </p> */}
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-dark">
                                        $2367
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div></>)}

        </div>
    );
}

export default Dashboard3;
