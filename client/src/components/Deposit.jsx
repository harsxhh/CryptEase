import React, { useState } from 'react'
import './styles/Deposit.scss'
import axios from 'axios'
import { URL } from '../utils/url'
import { toast } from 'react-toastify'
import Header from './Header'

const Deposit = () => {
  const [dollars, setdollars] = useState();
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

  const handleProceed = async (inrAmount) => {
    try {
      const response = await axios.post(
        `${URL}/payment/addBooking`,
        {
          rentPrice: inrAmount,
        }
      );
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
            const res=await axios.post(verifyUrl, verifyData)
            if(res.status===200){
              const res = await axios.post(`${URL}/user/sendupimoney`, {
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
            }
          }
          catch (err) {
            console.log(err);
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
    const inrAmount = parseFloat(dollars) * 83.36;
    await handleProceed(inrAmount);
  }
  return (
    <>
    <Header/>
      <div className='bg-white rounded-lg shadow-md p-4' style={{width:"50%",marginTop:"150px",marginLeft:'400px'}}>
        <h1 className='text-2xl font-bold mb-4'>Deposit</h1>
        <div className='mb-4'>
          <h1 className='text-lg font-bold'>Enter amount in dollars</h1>
          <form onSubmit={handleAddMoney} className='flex flex-col'>
            <input
              type='number'
              value={dollars}
              placeholder='Enter amount in dollars'
              onChange={(e) => setdollars(e.target.value)}
            />
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
              Deposit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Deposit
