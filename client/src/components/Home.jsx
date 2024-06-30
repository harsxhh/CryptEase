import React, { useEffect } from 'react'

const Home = () => {
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

export default Home
