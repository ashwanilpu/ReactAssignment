import React, { useEffect ,useState} from "react";
import './App.css';
import {getTokenFromUrl} from './spotify.js';

import { Route ,Routes, Navigate } from 'react-router-dom';
import Login from './component/Login';
import GuardedRoute from './GaurdedRoute';
import Search from './component/Search';




const App = ()=> {
    
   const [token, setToken] = useState(null)

    
  //  set accesstoken to token
  useEffect(()=>{
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if(_token){
      setToken(_token)
      
    }
  },[]);

  return (
 
     <Routes >
        <Route exact path='/' element={<Login/>}/>
        <Route path='/home' element={<Search token={token} />} />
        {/* <Route
          exact
          path='/home'
          element={(token ? <Search token={token} /> : <Login/>)}
             />;   
        
         <Route
  exact
  path="/home"
  element={(token ? <Search token={token} /> :<Navigate to="/" />)}
/>; */}
      </Routes >
    
  );
}

export default App;
