import React, { useState } from "react";
import {useDispatch, useSelector } from 'react-redux';

import { setLogout } from '../Store/features/authslice';
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const Navigate = useNavigate()
  const dispatch = useDispatch();

  const token = useSelector(state => state?.userAuth?.token);

  const HandleLogout = () =>{
    console.log("logging out ...");
    dispatch(
      setLogout({
        user: null,
        name: null,
  token: null,
  id :null,
  Email:null
 
  
      })
     )
     Navigate('/login')
  }
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>T</span>ask
            <span>M</span>anger
          </h2>
        </div>

        {/* 2nd menu part  */}
        {/* <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              <NavLink to="/service">services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
          </ul>
        </div> */}

        {/* 3rd social media links */}
        
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
             {
                token ?  <h1 className="log">
                <h1 className="log-text" onClick={HandleLogout}>Logout</h1>
              </h1> :
              <h1 className="log">
              <h1 className="log-text" onClick={()=>Navigate('/login')}>Login</h1>
            </h1>
              
             }
    
            </li>
            <li>
              
            </li>
            <li>
             
            </li>
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;