import React,{useContext,useState,useEffect} from 'react'
import {store} from '../../App';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import avatar from '../../avatar.png';
import './index.css';

const Dashboard = () => {
    const [token] = useContext(store);
    const [data,setData] = useState({});
    const getUsers = async () => {
        axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => {setData(res.data);}).catch((err) => console.log(err))
    }
    useEffect(() =>{
        getUsers();
    },[])

    if(!token){
        return <Redirect to='/login' />
    }
    // console.log(data);
    return (
        <div className='container'>
            {
                data &&
            <div className='profile-card'>
                <img className="card-img-top" src={avatar} alt="NotFound" />
                <h1 className="card-title">Welcome  {data.name}</h1>
            </div>
        }
        </div>
    )
}

export default Dashboard
