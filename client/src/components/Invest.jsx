import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/url';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Invest = () => {
  const navigate=useNavigate();
  const [invest, setInvest] = useState({
    coinName: 'Bitcoin',
    amount: '',
    duration: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInvest({ ...invest, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(invest.amount<=0 || invest.duration<=0){
        toast.error('Please enter a valid amount and duration');
        return;
      }
      const response = await axios.post(`${URL}/user/invest`, invest,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.data.status === 'success'){
        toast.success('Investment successful');
        navigate('/invested');
      }
    } catch (error) {
      console.error('Error investing:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Invest</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="coinName">Coin Name</label>
              <select
                className="form-control"
                id="coinName"
                value={invest.coinName}
                onChange={handleChange}
              >
                <option value="Bitcoin">Bitcoin</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Litecoin">Litecoin</option>
                <option value="Dogecoin">Dogecoin</option>
                <option value="Ripple">Ripple</option>
                <option value="Cardano">Cardano</option>
                <option value="Polkadot">Polkadot</option>
                <option value="Uniswap">Uniswap</option>
                <option value="Chainlink">Chainlink</option>
                <option value="Stellar">Stellar</option>
                <option value="Bitcoin Cash">Bitcoin Cash</option>
                <option value="Binance Coin">Binance Coin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                placeholder="Amount in dollars"
                value={invest.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                placeholder="Enter Duration in years"
                value={invest.duration}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Invest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invest;
