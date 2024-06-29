// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Deposit from './components/Deposit';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Overview from './components/Overview';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><DashBoard/><Overview/></>} />
      <Route path="/deposit" element={<><DashBoard/><Deposit/></>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
