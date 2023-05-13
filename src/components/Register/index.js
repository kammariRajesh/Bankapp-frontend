import React,{useState} from 'react'
import axios from 'axios'
import './index.css'

const Register = () => {
  const [userDetails, setUserDetails] = useState({name:"",email:"", account:"",bank:"",status:"",balance:"",password:'',confirmPassword:'',message:""})
  const formValues = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }
  const register = async (e) => {
    e.preventDefault()
    try{
        const body =  JSON.stringify({name:userDetails.name,email:userDetails.email,account:userDetails.account,bank:userDetails.bank,status:userDetails.status,balance:userDetails.balance,password:userDetails.password,confirmPassword:userDetails.confirmPassword});
        const res = await axios.post('http://localhost:5000/register', body, {
          headers:{
            "Content-Type": "application/json"
          }
        })
        setUserDetails({name:"",email:"", account:"",bank:"",status:"",balance:"",password:'',confirmPassword:'',message:res.data.message})
    }catch(err){
        console.log(err)
    }
    
  }
  return (
    <div className='container'>
      <h1 className='title'>Register User</h1>
      <form onSubmit={register}>
        <label>Name:</label>
        <input type="text" placeholder='Name' value={userDetails.name} required id="name" name="name" onChange={formValues} /><br/>
        <label>Email:</label>
        <input type="email" placeholder='Email' value={userDetails.email} required id="email" name="email" onChange={formValues} /><br/>
        <label>Account No:</label>
        <input type="text" placeholder='Account No' value={userDetails.account} required id="account" name="account" onChange={formValues} /><br/>
        <label>Bank Name:</label>
        <input type="text" placeholder='Bank' value={userDetails.bank} required id="bank" name="bank" onChange={formValues} /><br/>
        <label>Status:</label>
        <input type="text" placeholder='Status' value={userDetails.status} required id="status" name="status" onChange={formValues} /><br/>
        <label>Balance:</label>
        <input type="text" placeholder='Balance' value={userDetails.balance} required id="balance" name="balance" onChange={formValues} /><br/>
        <label>Password:</label>
        <input type="password" placeholder='Password' value={userDetails.password} required id="password" name="password" onChange={formValues} /><br/>
        <label>Confirm Password:</label>
        <input type="password" placeholder='Confirm Your Password' value={userDetails.confirmPassword} required id="confirmPassword" name="confirmPassword" onChange={formValues} /><br/>
        <button type='submit'>Register</button>
        {userDetails.message && <p className='msg'>*{userDetails.message}</p>}
      </form>
    </div>
  )
}

export default Register
