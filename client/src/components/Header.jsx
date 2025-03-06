import React from 'react'
import { NFTContext } from '../context/NFTcontext';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate=useNavigate();
    const { connectWallet, connectedAccount, user } = React.useContext(NFTContext);
    const investItems = [
        { label: 'Invest Now', to: '/invest' },
        { label: 'My Investments', to: '/invested' },
    ];

    const nftItems = [
        { label: 'Mint NFTs', to: '/mintnft' },
        { label: 'My NFTs', to: '/nfts' },
        { label: 'Buy NFTs', to: '/buynft' }
    ];
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/signin')
    }
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
                    <Link to="/" style={{ fontSize: "30px", margin: 0 }}>FinteX</Link>
                </div>
                <nav className="flex items-center p-4">
                    <Link className="m-2 text-gray-700 font-medium hover:text-blue-500" to="/portfolio">
                        PORTFOLIO
                    </Link>
                    <Link className="m-2 text-gray-700 font-medium hover:text-blue-500" to="/deposit">
                        DEPOSIT
                    </Link>
                    <Link className="m-2 text-gray-700 font-medium hover:text-blue-500" to="/loan">
                        LOAN
                    </Link>
                    <Dropdown title="INVEST" items={investItems} />
                    <Dropdown title="NFT's" items={nftItems} />
                </nav>
                <div>
                    <p>Wallet Amount: ${user?.wallet} </p>
                </div>
                <div>
                    <p onClick={handleLogout} style={{ margin: "15px 30px", padding: "10px 20px", backgroundColor: "#f8f9fa", color: "black", border: "2px solid black", borderRadius: "25px", cursor: "pointer", fontFamily: "Montserrat" }}>LogOut</p>
                </div>
                <div >
                    {!connectedAccount && <a style={{ margin: "15px 30px", padding: "10px 20px", backgroundColor: "#f8f9fa", color: "black", border: "2px solid black", borderRadius: "25px", cursor: "pointer", fontFamily: "Montserrat" }} onClick={connectWallet}>Connect Wallet</a>}
                    {connectedAccount && <p style={{ margin: "15px 30px", padding: "10px 20px", backgroundColor: "#f8f9fa", color: "black", border: "2px solid black", borderRadius: "25px", cursor: "pointer", fontFamily: "Montserrat" }}>{connectedAccount}</p>}
                </div>
            </header>
        </div>
    )
}

export default Header