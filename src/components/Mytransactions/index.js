import React,{useContext,useEffect} from 'react'
import { store } from '../../App'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const Txlist = () => {
  const [token,setToken,mydata,setMydata] = useContext(store);
  console.log(mydata);
  
  const addtxtoList = async () => {
    try{
      const res = await axios.post('http://localhost:5000/addtxlist', mydata, {
          headers: {
            'x-token' : token
          }
        })
      
      console.log(res.data);

    }catch(err){
      console.log(err)
    }
  }


// const getTransactions = async () => {
//      const res = await axios.get('http://localhost:5000/gettxs');
//      console.log(res.data);
// }

  useEffect(() => {
    addtxtoList();
  },[])

if(!token){
  return <Redirect to='/login' />
}

  return (
    <div className='container'>
      <h1 className='title'>balance:{mydata.balance}</h1>
      <h1 className='title'>type:{mydata.type}</h1>
      <h1 className='title'>amount:{mydata.amount}</h1>
      <h1 style={{textAlign:"center",color:"red",fontSize:"30px"}}>you have {mydata.balance} in your account</h1>
    </div>
  )
}

export default Txlist
