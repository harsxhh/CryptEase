// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Deposit from './components/Deposit';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Overview from './components/Overview';
import Invest from './components/Invest';
import InvestMents from './components/InvestMents';
import Loan from './components/Loan';
import MintNFT from './components/MintNFT';
import MintNFTwatch from './components/MintNFTwatch';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><DashBoard/><Overview/></>} />
      <Route path="/deposit" element={<><DashBoard/><Deposit/></>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/invest" element={<><DashBoard/><Invest/></>} />
      <Route path="/invested" element={<><DashBoard/><InvestMents/></>} />
      <Route path="/loan" element={<><DashBoard/><Loan/></>} />
      <Route path="/mintnft" element={<><DashBoard/><MintNFT/></>} />
      <Route path="/mintnft/:genre" element={<><DashBoard/><MintNFTwatch/></>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
