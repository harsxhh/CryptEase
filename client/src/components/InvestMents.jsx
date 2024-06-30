import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import { URL } from '../utils/url'
const InvestMents = () => {
    const [investments, setInvestments] = useState([]);
    
    useEffect(() => {
        const fetchData = () => {
            axios.get(`${URL}/user/invest`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    console.log(res.data)
                    setInvestments(res.data.investments)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchData();
    },[])
    console.log(investments)
    return (
        <>
            <div className="container flex ml-30%">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Investments</h1>
                    </div>
                </div>
                {investments.length === 0 ? <h1>No Investments</h1> : 
                    <div className="row">
                    <div className="col-md-6">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Coin Name</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                               {investments?.map((investment)=>{
                                return <tr>
                                    <td>{investment?.coinName}</td>
                                    <td>{investment?.amount}</td>
                                    <td>{investment?.duration} year</td>
                                </tr>
                               })}
                            </tbody>
                        </table>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default InvestMents
