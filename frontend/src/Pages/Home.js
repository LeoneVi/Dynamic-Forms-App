import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Create, collect, and analyze with ease.
          </h1>
          <p className="primary-text">
            Get started making forms.
          </p>
          <button 
            className="primary-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="primary-button"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
