import React from 'react'
import { NFTContext } from '../context/NFTcontext';
import Dropdown from './Dropdown';
function Header() {
    const { connectWallet, connectedAccount } = React.useContext(NFTContext);
    const investItems = [
        { label: 'Invest Now', href: '/invest' },
        { label: 'Show My Investments', href: '/invested' },
      ];
    
      const nftItems = [
        { label: 'Explore NFTs', href: '/mintnft' },
        { label: 'My NFTs', href: '/nfts' },
      ];
    return (
        <div>
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
                    <a href="/" style={{ fontSize: "30px", margin: 0 }}>FinteX</a>
                </div>
                <nav className="flex items-center p-4">
                    <a className="m-2 text-gray-700 font-medium hover:text-blue-500" href="/portfolio">
                        PORTFOLIO
                    </a>
                    <a className="m-2 text-gray-700 font-medium hover:text-blue-500" href="/deposit">
                        DEPOSIT
                    </a>
                    <a className="m-2 text-gray-700 font-medium hover:text-blue-500" href="/loan">
                        LOAN
                    </a>
                    <Dropdown title="INVEST" items={investItems} />
                    <Dropdown title="NFT's" items={nftItems} />
                </nav>
                <div>
                    {!connectedAccount && <a style={{ margin: "15px 30px", padding: "10px 20px", backgroundColor: "#f8f9fa", color: "black", border: "2px solid black", borderRadius: "25px", cursor: "pointer", fontFamily: "Montserrat" }} onClick={connectWallet}>Connect Wallet</a>}
                    {connectedAccount && <p style={{ margin: "15px 30px", padding: "10px 20px", backgroundColor: "#f8f9fa", color: "black", border: "2px solid black", borderRadius: "25px", cursor: "pointer", fontFamily: "Montserrat" }}>{connectedAccount}</p>}
                </div>
            </header>
        </div>
    )
}

export default Header