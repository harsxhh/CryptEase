import React, { useContext, useState, useEffect } from 'react';
import { NFTContext } from '../context/NFTcontext';
import Header from './Header';
function DashBoard2() {
    const { connectWallet, connectedAccount } = useContext(NFTContext);
    return (
        <div style={{ backgroundColor: "#ffffff", fontFamily: "Roboto Mono", padding: 0, margin: 0 }}>
            <Header />

            <div style={{ margin: "200px 0 0 150px", borderRadius: "25px" }}>
                <section class="flex bg-white dark:bg-white-900">
                    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div class="lg:col-span-7">
                            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-dark" style={{ fontFamily: "Roboto Mono" }}>
                                YOUR OWN FINTECH PLATFORM
                            </h1>
                            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-dark dark:border-gray-700 dark:hover:bg-gray-200 dark:focus:ring-gray-800" style={{ fontFamily: "Roboto Mono" }}>
                                Get Started
                                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>

                        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <img src="home.png" alt="mockup" style={{marginTop:"-200px"}}/>
                        </div>
                    </div>
                </section>
            </div>

            {/* three cards in flex, displaying information */}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "50px 0", fontFamily: "Roboto Mono", marginLeft: "225px" }}>
                <div style={{ width: "30%", padding: "20px", borderRadius: "25px", backgroundColor: "#f8f9fa" }} >
                    <a href="/invest" style={{ color: "black", fontSize: "20px" }}>INVEST</a>
                    <p style={{ color: "black", paddingBottom: "5px" }}>Invest in your future with our easy to use platform</p>
                    {/* horizontal line */}

                    <img src="invest.png" alt="mockup" />

                </div>
                <div style={{ width: "30%", padding: "20px", borderRadius: "25px", backgroundColor: "#f8f9fa" }}>
                    <a href="/loan" style={{ color: "black", fontSize: "20px" }}>LOAN</a>
                    <p style={{ color: "black" }}>Get a loan to start your business</p>
                    <img src="loan.png" alt="mockup" />
                </div>
                <div style={{ width: "30%", padding: "20px", borderRadius: "25px", backgroundColor: "#f8f9fa" }}>
                    <a href="/mintnft" style={{ color: "black", fontSize: "20px" }}>NFT's</a>
                    <p style={{ color: "black" }}>Mint your own NFT's</p>
                    <img src="nft.png" alt="mockup" />

                </div>
            </div>



            
        </div>
    );
}

export default DashBoard2;
