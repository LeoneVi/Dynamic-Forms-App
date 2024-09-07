import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import NoPage from './Pages/NoPage';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*
//const apiCall = () => {
//  console.log("foo");
  axios.get('http://localhost:4000/user').then((data) => {
    // This console.log will be in our frontend console
    console.log(data);
  }).catch((e) => {
    console.log(e);
  });
};
*/

const apiCall = async () => {
  try {
    const data = await axios.get('http://localhost:4000/user');
    console.log(data);
  } catch(e) {
    console.log(e);
  }
}

//axios and get the path for your authentication 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Use element prop */}
          <Route path="/signup" element={<SignUp />} /> {/* Use element prop */}
          <Route path="*" element={<NoPage />} /> {/* Use element prop */}
        </Routes>
      </BrowserRouter>
    </div>
    // <div className="App">
    //   <Home />
    // </div>
  );
}

export default App;

