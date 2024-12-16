import { useState } from 'react';
import {ethers} from 'ethers';
import ABI from './assets/Cert.json';
import address from './assets/deployed_addresses.json';


function App() {
  const [fromData,setFormData]= useState({
    id:0,
    name:'',
    course:'',
    grade:'',
    date:''
  })
  const [output,setOutput]=useState('');
  function handleChange(event){
    console.log(event.target);
    const {name,value} = event.target;
    console.log(name);
    setFormData((preState)=>({...preState,[name]:value}))
    console.log(fromData);
  }
  async function connectToMetamask(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer= await provider.getSigner();
    console.log(signer.address);
    alert(`${signer.address} is successfully logged in`)
  }
  async function handleSubmit(event){
    event.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer= await provider.getSigner();
    const cAbi = ABI.abi;
    const cAddress= address['CertModule#Cert'];
    console.log(cAddress);
    const certiInstance = new ethers.Contract(cAddress,cAbi,signer);
    console.log(certiInstance);
    const txnReceipt = await certiInstance.issue(fromData.id,
                        fromData.name,
                        fromData.course,
                        fromData.grade,
                        fromData.date);
    console.log(txnReceipt);
  }
  async function getCertificate(){
    const id = document.getElementById('ID').value;
    console.log(id);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer= await provider.getSigner();
    const cAbi = ABI.abi;
    const cAddress= address['CertModule#Cert'];
    console.log(cAddress);
    const certiInstance = new ethers.Contract(cAddress,cAbi,signer);
    const txValue = await certiInstance.Certificates(id);
    console.log(txValue[0]);
    setOutput(`Name of Candidate:${txValue[0]} Course:${txValue[1]} Grade:${txValue[2]} Date:${txValue[3]}}`)

  }
 return(
  <div>
    <div>
      <button onClick={connectToMetamask}>Connect To Metamask</button>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <label>ID:</label>
        <input type='number' id='id' name='id' onChange={handleChange}></input>
        </div>
        <div>
        <label>Name:</label>
        <input type='text' id='name' name='name' onChange={handleChange}></input>
        </div>
        <div>
        <label>Course</label>
        <input type='text' id='course' name='course' onChange={handleChange}></input>
        </div>
        <div>
        <label>Grade:</label>
        <input type='text' id='grade' name='grade' onChange={handleChange}>
        </input></div>
        <div>
        <label>Date</label>
        <input type='date' id='date' name='date' onChange={handleChange}></input>
        </div>
        <div>
        <input type='submit' value='Submit'></input>
        </div>
      </form>
      <div>
        <input type='number' id='ID' name='ID' placeholder='Enter CertificateId'></input>
        <button onClick={getCertificate}>Get Certificate</button>
      </div>
    </div>
    <div>
      <p>{output}</p>
    </div>
  </div>
 )
}

export default App
