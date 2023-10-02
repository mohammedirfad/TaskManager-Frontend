
import React, { useEffect, useState } from 'react';
import './Login.css'
import { UserLogin } from '../../Api/Services/userAuth';
import { useDispatch } from "react-redux";
import { setLogin } from '../../Store/features/authslice';
import {  useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [backendError, setBackendError] = useState('');

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    
    setBackendError('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email ,"emial",password,"pass");

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
   
    try{
        const response = await UserLogin(email,password);

        if(response?.status === 200 ){
          let Auth = response?.data;
          
          if(Auth){
            dispatch(
              setLogin({
                 user: "user",
                 name: Auth?.user?.name,
                 token: Auth?.Token,
                 id   : Auth?.user._id,
                 Email:Auth?.user?.email
                
              })
           )
          }
          Navigate('/')

        }
        else{
          setBackendError(response?.data?.message)
        }
    }
    catch(err){
      console.log(err);
      setBackendError(err.response?.data?.message)
    }
    
  };

  return (
   <div className='cover'>
     <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    
      {backendError && <div className="error-message">{backendError}</div>}
   
      <div className='reg-link'>Dont have an account <span onClick={()=>Navigate('/signup')}>click here</span> </div>
    </div>

   </div>
  );
};

export default Login;
