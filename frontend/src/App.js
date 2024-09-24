import React from 'react';
import axios from 'axios'; // axios should be imported before other components

import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import NoPage from './Pages/NoPage';
import CreatePost from './Components/CreatePost'; // Import CreatePost component
import EditPost from './Components/EditPost'; // Import EditPost component

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Always import at the top

// Function to make an API call (example)
const apiCall = async () => {
  try {
    const data = await axios.get('http://localhost:4000/user');
    console.log(data);
  } catch(e) {
    console.log(e);
  }
};

// Main App component
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreatePost />} /> {/* Route to create a post */}
          <Route path="/edit/:postId" element={<EditPost />} /> {/* Route to edit a post */}
          <Route path="*" element={<NoPage />} /> {/* Fallback for 404 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
