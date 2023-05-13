import './App.css';
import React,{useState,createContext} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Register from './components/Register';
import Nav from './components/Nav';
import LoginForm from './components/Login';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import Tx from './components/Transaction';
import Withdraw from './components/Transaction/withdraw';
import Deposit from './components/Transaction/deposit';
import Transfer from './components/Transaction/transfer';
import Txlist from './components/Mytransactions';


export const store = createContext();

function App() {
  const [token,setToken] = useState(null);
  const [mydata,setMydata] = useState({amount:"",balance:"0" ,type:""});
  return (
    <div className="App">
      <store.Provider value={[token,setToken,mydata,setMydata]}>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/profile" component={Dashboard} />
            <Route exact path="/tx" component={Tx} />
            <Route exact path="/" component={Home} />
            <Route exact path="/withdraw" component={Withdraw} />
            <Route exact path="/deposit" component={Deposit} />
            <Route exact path="/transfer" component={Transfer} />
            <Route exact path="/txlist" component={Txlist} />
          </Switch>
        </div>
      </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
