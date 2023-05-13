import React,{useState,useContext} from 'react'
import axios from 'axios'
import './index.css'
import {store} from '../../App';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
  const [token,setToken] = useContext(store)
  const [userLoginDetails, setUserLoginDetails] = useState({email:"",password:"",message:""})
  const formValues = (e) => {
    setUserLoginDetails({...userLoginDetails, [e.target.name]: e.target.value})
  }
  const submitLogin = async (e) => {
        e.preventDefault()
        try{
          axios.post('http://localhost:5000/login',userLoginDetails).then(
            res => {setToken(res.data.token); setUserLoginDetails({userEmail:"",userPassword:"", message:res.data.message})})
            
        }catch(err){
            console.log(err)
        }
        
    }

    if(token){
      return <Redirect to='/profile' />
    }

  return (
    <div className='container'>
      <h1 className='title'>Login Here</h1>
      <form onSubmit={submitLogin}>
        <label>Email:</label>
        <input type="email" placeholder='Email' value={userLoginDetails.email} required id="email" name="email" onChange={formValues} /><br/>
        <label>Password:</label>
        <input type="password" placeholder='Password' value={userLoginDetails.password} required id="password" name="password" onChange={formValues} /><br/>
        <button type='submit'>Login</button>
        {userLoginDetails.message && <p className='msg'>*{userLoginDetails.message}</p>}
      </form>
    </div>
  )
}

export default LoginForm
