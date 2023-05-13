import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from '../../App';
import { Redirect } from 'react-router-dom';


const Withdraw = () => {
  const [token,setToken,mydata,setMydata] = useContext(store);
  const [txdetails,setTxdetails] = useState({account:"",type:"",mode:"",amount:"",balance:"0" ,message:""});

  const formValues = (e) => {
    setTxdetails({...txdetails, [e.target.name]: e.target.value});
  }
  const getBalance = async (e) => {
    const res = await axios.get('http://localhost:5000/getbalance', {
      headers: {
        'x-token' : token
      }
    })
    return res.data.balance
  }
  const updateBalance = async (e) => {
    const b = parseInt(await getBalance())-parseInt(txdetails.amount);
    const bal = {
      balance: b
    }
    const res = await axios.put('http://localhost:5000/updatebalance', {...bal}, {
      headers: {
        'x-token' : token
      }
    })
    // console.log(res.data);
    return res.data;
  }

  const submitTx = async (e) => {
    e.preventDefault()
    txdetails.balance = await updateBalance();
    txdetails.type = "deposit";
    txdetails.mode = "debit";
   
    try{
        const res = await axios.post('http://localhost:5000/addtx', txdetails, {
          headers: {
            'x-token' : token
          }
        })
        setMydata({...mydata, balance:res.data.newTX.balance,type:"withdraw",amount:res.data.newTX.amount});
        setTxdetails({account:"",type:"",mode:"",amount:"",balance:"" ,message:res.data.message})
         
        // console.log(res.data.newTX);
        
    }catch(err){
        console.log(err)
    }
    
  }
 
  if(!token){
    return <Redirect to='/login' />
  }
  return (
    <div className='container'>
          <h1 className='title'>Transfer amount from your account to others account</h1>
          <form onSubmit={submitTx}>
            <label>To Account Number:</label>
            <input type="text" placeholder='Account No' value={txdetails.account} required id="account" name="account" onChange={formValues} /><br/>
            <label>Amount:</label>
            <input type="text" placeholder='Amount' value={txdetails.amount} required id="amount" name="amount" onChange={formValues} /><br/>
            <button type='submit'>withdraw</button>
            {txdetails.message && <p className='msg'>*{txdetails.message}</p>}
          </form>
    </div>
  )
}

export default Withdraw
