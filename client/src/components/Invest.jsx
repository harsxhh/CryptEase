// import React, { useState } from 'react';
// import axios from 'axios';
// import { URL } from '../utils/url';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// const Invest = () => {
//   const navigate=useNavigate();
//   const [invest, setInvest] = useState({
//     coinName: 'Bitcoin',
//     amount: '',
//     duration: ''
//   });
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setInvest({ ...invest, [id]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if(invest.amount<=0 || invest.duration<=0){
//         toast.error('Please enter a valid amount and duration');
//         return;
//       }
//       const response = await axios.post(`${URL}/user/invest`, invest,{
//         headers:{
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       if(response.data.status === 'success'){
//         toast.success('Investment successful');
//         navigate('/invested');
//       }
//     } catch (error) {
//       console.error('Error investing:', error);
//     }
//   };

//   return (<>
//     <Header />
//     <div className="container" style={{ marginTop: '100px' }}>
//       <div className="row">
//         <div className="col-md-12">
//           <h1>Invest</h1>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="coinName">Coin Name</label>
//               <select
//                 className="form-control"
//                 id="coinName"
//                 value={invest.coinName}
//                 onChange={handleChange}
//               >
//                 <option value="Bitcoin">Bitcoin</option>
//                 <option value="Ethereum">Ethereum</option>
//                 <option value="Litecoin">Litecoin</option>
//                 <option value="Dogecoin">Dogecoin</option>
//                 <option value="Ripple">Ripple</option>
//                 <option value="Cardano">Cardano</option>
//                 <option value="Polkadot">Polkadot</option>
//                 <option value="Uniswap">Uniswap</option>
//                 <option value="Chainlink">Chainlink</option>
//                 <option value="Stellar">Stellar</option>
//                 <option value="Bitcoin Cash">Bitcoin Cash</option>
//                 <option value="Binance Coin">Binance Coin</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="amount">Amount</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="amount"
//                 placeholder="Amount in dollars"
//                 value={invest.amount}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="duration">Duration</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="duration"
//                 placeholder="Enter Duration in years"
//                 value={invest.duration}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Invest
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Invest;

import React, { useState } from 'react';
import Header from './Header';
const Invest = () => {
  const [invest, setInvest] = useState({
    coinName: 'Bitcoin',
    amount: '',
    duration: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInvest({ ...invest, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', invest);
  };

  const coinOptions = [
    'Bitcoin', 'Ethereum', 'Litecoin', 'Dogecoin', 'Ripple', 'Cardano',
    'Polkadot', 'Uniswap', 'Chainlink', 'Stellar', 'Bitcoin Cash', 'Binance Coin'
  ];

  return (<>
  <Header/>
    <div className="container" style={{marginTop:"150px",marginLeft:"100px"}}>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Invest</h1>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="coinName" className="block text-sm font-medium text-gray-700">Coin Name</label>
              <select
                id="coinName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={invest.coinName}
                onChange={handleChange}
              >
                {coinOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="text"
                id="amount"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Amount in dollars"
                value={invest.amount}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                id="duration"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Duration in years"
                value={invest.duration}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Invest
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Invest;
