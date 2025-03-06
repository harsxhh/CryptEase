import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../utils/url';
import './styles/Loan.scss';
import Header from './Header';
const Loan = () => {
  const [user, setUser] = useState();
  const [dollars, setDollars] = useState();
  const [confirm, setConfirm] = useState(false);
  const [loan, setLoan] = useState();

  const loadRazorpayScript = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => { };
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/user/loan`, {
        amount: dollars
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.status === 200) {
        toast.success('Transaction Successful');
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setConfirm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUser(res.data.data.user[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleProceed = async (inrAmount) => {
    try {
      const response = await axios.post(`${URL}/payment/addBooking`, {
        rentPrice: inrAmount,
      });
      initPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_S7O9aeETo3NXrl",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderDetails.razorpayOrderId,
      handler: async (response) => {
        try {
          const verifyUrl = `${URL}/payment/verify`;
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          try {
            const res = await axios.post(verifyUrl, verifyData);
            if (res.status === 200) {
              const res = await axios.post(`${URL}/user/payloan`, {
                amount: loan
              }, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
              if (res.status === 200) {
                toast.success('Transaction Successful');
                setTimeout(() => {
                  window.location.reload();
                }, 1300);
              }
            }
          } catch (err) {
            toast.error(err.response.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (loan > user.loan) {
      toast.error('You cannot pay more than your loan');
    } else {
      const inrAmount = parseFloat(loan) * 83.36;
      await handleProceed(inrAmount);
    }
  };

  return (<><Header/>
    <div className="loan-container mt-5 ml-40 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">Take Loan</h1>
        <div className="mb-4">
          <h1 className="text-lg font-bold">Enter amount in dollars</h1>
          <form onSubmit={handleClick}>
            <input
              type="number"
              value={dollars}
              placeholder="Enter amount in dollars"
              onChange={(e) => setDollars(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit
            </button>
          </form>
        </div>
        {confirm && (
          <div className="mb-4">
            <h1 className="text-lg font-bold">Confirm</h1>
            <p>
              Are you sure you want to take a loan of {dollars} dollars which is equal to {dollars * 83.36} INR?
            </p>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Confirm
            </button>
            <button onClick={() => setConfirm(false)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          {/* <h1 className="text-2xl font-bold mb-4">Loan Information</h1> */}
          <h1 className="text-lg font-bold mb-2">Pay Loan</h1>
          <h1 className="text-lg font-bold">Total Debt: {user?.loan || 0} dollars</h1>
        </div>
        <div>
          <form onSubmit={handleAddMoney}>
            <input
              type="number"
              value={loan}
              placeholder="Enter amount in dollars you want to pay"
              onChange={(e) => setLoan(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Pay Loan
            </button>
          </form>
        </div>
      </div>
    </div></>
  );
};

export default Loan;
