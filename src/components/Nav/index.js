import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { store } from '../../App';
import './index.css'
const Nav = () => {
  const [token,setToken] = useContext(store)
  return (
    <div>
      {!token ?(
        <nav>
        <h1>MERN</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        </nav>
      ) : (

      <nav>
      <h1>MERN</h1>
      <ul>
        <li><Link to="/profile">Dashboard</Link></li>
        <li><Link to="/txlist">MyTransactions</Link></li>
        <li><Link to="/tx">Do Transactions</Link></li>
        <li><button type="button" onClick={() => setToken(null)}>Logout</button></li>
      </ul>
    </nav>
      )}
    </div>
    
  )
}

export default Nav
