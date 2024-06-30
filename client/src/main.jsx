import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NFTProvider } from './context/NFTcontext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <NFTProvider>
    <App />
    <ToastContainer />,
  </NFTProvider>
)
