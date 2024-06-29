import React, { useEffect } from 'react'

const Overview = () => {
    const token=localStorage.getItem("token");
    useEffect(()=>{
          if(!token){
            window.location.href="/signin"
          }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Overview
