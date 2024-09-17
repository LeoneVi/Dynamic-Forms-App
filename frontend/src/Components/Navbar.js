import React from "react";
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2"
import '../CSS/Navbar.css'; 


const Navbar = () => {

  const navigate = useNavigate();
 
  return <nav>
    <div className="nav-logo-container">
       <img src="https://placehold.co/60x70/png"/>
    </div>
    <h1>Forms</h1>
    <div className="navbar-links-container">
        <button 
          className="transparent-button"
          onClick={() => navigate('/signup')}
        > 
          Sign up
        </button>
        <button 
          className="clear-button"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
    </div>
  </nav>;
}

export default Navbar;