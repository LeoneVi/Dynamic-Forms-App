import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const BACKEND = "http://localhost:4000/login";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    axios
      .post(`${BACKEND}`, { email, password })
      .then((result) => {
        console.log(result);
        if(result.data.status === "Success"){
          localStorage.setItem("userId", result.data.userId);
          navigate("/dashboard")
        }else{
          navigate("/signup")
          alert("You are not registered to this service")
        }

      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={submit}>
        <label htmlFor="femail">Email:</label>
        <input
          type="text"
          id="femail"
          name="femail"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="fpassword">Password:</label>
        <input
          type="password" // Use password type for security
          id="fpassword"
          name="fpassword"
          value={password} // Controlled input
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}



/*
Backend, does my account exist, here's a secret key. Dashboard asks for keys
Everytime you go to a new page in the website, you pass the key along
*/
