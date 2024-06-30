// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import DashBoard2 from './components/DashBoard2';
// import DashBoard3 from './components/Dashboard3';
import Deposit from './components/Deposit';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Invest from './components/Invest';
import InvestMents from './components/InvestMents';
import Loan from './components/Loan';
import MintNFT from './components/MintNFT';
import MintNFTwatch from './components/MintNFTwatch';
import NFTs from './components/NFTs';
import Porfolio from './components/Porfolio';
import BuyNFTs from './components/BuyNFTs';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><DashBoard2/><Home/></>}/>
      <Route path="/deposit" element={<><DashBoard/><Deposit/></>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/invest" element={<><Invest/></>} />
      <Route path="/invested" element={<><InvestMents/></>} />
      <Route path="/loan" element={<><Loan/></>} />
      <Route path="/mintnft" element={<><MintNFT/></>} />
      <Route path="/mintnft/:genre" element={<><MintNFTwatch/></>} />
      <Route path="/nfts" element={<><NFTs/></>} />
      <Route path="/portfolio" element={<><Porfolio/></>} />
      <Route path="/buynft" element={<><BuyNFTs/></>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
