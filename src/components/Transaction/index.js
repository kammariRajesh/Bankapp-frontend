import React,{useState,useContext} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import {store} from '../../App'
import './index.css'
import Withdraw from './withdraw'

const Tx = () => {
  const [token] = useContext(store);
  const history = useHistory();
  


  if(!token){
    return <Redirect to='/login' />
  }
  return (
    <div className='container'>
      <h1 className='title'>Transaction</h1>
      <div className='buttons'>
      <button type='button' onClick={() => history.push('/withdraw')}>Withdraw</button>
      <button type='button' onClick={() => history.push('/deposit')}>Deposit</button>
      <button type='button' onClick={() => history.push('/transfer')}>Transfer</button>
      </div>
    </div>
  )
}

export default Tx
