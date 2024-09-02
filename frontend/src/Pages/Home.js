import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
   return (
    <div className="home-container">
        <Navbar/>
        <div className="home-banner-container">
            <div className="home-text-section">
                <h1 className="primary-heading">
                    Create, collect, and analyze with ease.
                </h1>
            <p className="primary-text">
                Get started making forms.
            </p>
            <button className="primary-button">
                Login
            </button>
            <button className="primary-button">
                Sign up
            </button>
            </div>
        </div>
    </div>
   )

    
}

export default Home