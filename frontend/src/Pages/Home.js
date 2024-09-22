import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  //<img src="https://placehold.co/425x543/png"/>

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">

        <div className="home-text-container">
          <h1 className="primary-heading">
            Create, collect, and analyze with ease.
          </h1>
          <p className="primary-text">
            Get started making forms.
          </p>
          <button 
            className="purple-button"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
          <button 
            className="clear-button"
            onClick={() => navigate('/signup')}
          >
            Go to Forms
          </button>

          <div className="image-container">
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
