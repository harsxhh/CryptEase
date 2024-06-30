import abi from './NFTRewards.json'
export const contractABI=abi.abi;
export const contractAddress= "0x5FbDB2315678afecb367f032d93F642f64180aa3";
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);

export const NFTContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

console.log(NFTContract);