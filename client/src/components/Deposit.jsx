import React, { useState } from 'react'
import './styles/Deposit.scss'
import axios from 'axios'
import { URL } from '../utils/url'
import { toast } from 'react-toastify'
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
      console.log(response.data);
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
  const handleAddMoney = async () => {
    const inrAmount = parseFloat(dollars) * 83.36;
    await handleProceed(inrAmount);
  }
  return (
    <>
      <div className='deposit'>
        <div>
          <p>Enter Amount in dollars </p>
        </div>
        <div>
          <input type="text" value={dollars} placeholder="Enter Amount" onChange={(e) => setdollars(e.target.value)} />
        </div>
        <div onClick={handleAddMoney}>
          <button>Deposit</button>
        </div>
      </div>
    </>
  )
}

export default Deposit
