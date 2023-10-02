
import React, { useEffect, useState } from 'react';
import '../Login/Login.css'
import {  useNavigate } from 'react-router-dom';
import { UserSignup } from '../../Api/Services/userAuth';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success ,setSuccess] = useState("")
  const [backendError, setBackendError] = useState('');

  
  const Navigate = useNavigate();

  useEffect(() => {
    
    setBackendError('');
  }, [email, password,name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password ||!name) {
      setError('please fill the required credentilas');
      return;
    }
   
    try{
        const response = await UserSignup(email,password,name);

        if(response?.status === 200 ){
          
          setSuccess(response?.data?.message)
          Navigate('/login')
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>

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
        <button type="submit">Submit</button>
      </form>
      {success && <div className="succes-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    
      {backendError && <div className="error-message">{backendError}</div>}
   
      <div className='reg-link'>already have an account <span onClick={()=>Navigate('/login')}>click here</span> </div>
    </div>

   </div>
  );
};

export default Signup;
