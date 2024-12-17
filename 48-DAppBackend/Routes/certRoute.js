import e, { Router } from "express";
import { assert, ethers } from "ethers";
import ABI from "./Cert.json" assert {type:"json"};
import address from "./deployed_addresses.json" assert {type:"json"};
import dotenv from 'dotenv';
dotenv.config();

const certRoute = Router();
//Code for Hardhat node
// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
// const signer= await provider.getSigner();
// console.log(signer.address);
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/w78nxmxF-ccuxdezBf7qeeAfjKozUIUr");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
console.log(signer.address);
const certInstance = new ethers.Contract(address["CertModule#Cert"],ABI.abi,signer)

certRoute.get('/',(req,res)=>{
    console.log("hi");
  res.send("Hello Welcome to certiApp");
})

certRoute.post('/issue',async(req,res)=>{
    try{
    const {id,name,course,grade,date} = req.body;
    const txnReceipt= await certInstance.issue(id,name,course,grade,date);
    console.log(txnReceipt);
    if(txnReceipt){
        res.send(txnReceipt.hash)
    }
    else{
        res.status(404).json({message:"Your transaction failed"})
    }}
    catch{
        res.status(500).json({message:"Cannot issue"});
    }

});

certRoute.get('/getCertificate',async (req,res)=>{
    try{
    console.log("hi");
    const id = req.query.id;
    console.log(id);
   console.log(typeof(id)); 
   let id1 = parseInt(id)
   console.log(typeof(id1));
    const txnValue = await certInstance.Certificates(id1);
    console.log(txnValue);
    if(txnValue){
        res.status(200).send(txnValue);
    }
    else{
        res.status(404).json({message:"No such entry"});
    }}catch{
        res.status(500).json({message:"Something happened..Try again"});
    }
})
export {certRoute}