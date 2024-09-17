
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function SignUp() {

const BACKEND = "http://localhost:4000/signup"

const [email, setEmail] = useState();
const [password, setPassword] = useState();
const navigate =  useNavigate();

async function submit(e) {

    e.preventDefault()
    axios
    .post(`${BACKEND}`, { email, password })
    .then(result => {console.log(result)
    navigate("/login")
    })
    .catch(err => console.log(err))

}
    /*
    const email = e.target.femail.value;
    const password = e.target.fpassword.value;
// const confirmPassword = e.target.fconfirmpassword.value;

    const res = await fetch(BACKEND, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
    console.log(res)

}
    */


   return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit = {submit}>
        <label htmlFor="femail">Email:</label>
        <input 
            type="text" 
            placeholder="Email"
            id="femail" 
            name="femail" 
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="fpassword">Password:</label>
        <input 
            type="text" 
            placeholder="Password"
            id="fpassword" 
            name="fpassword"
            onChange={(e) => setPassword(e.target.value)} 
        />
    
        <button type="submit">Sign Up</button> 
    </form>
  </div>
   ) 
}

/*
  <label htmlFor="fconfirmpassword">Confirm Password:</label>
        <input 
            type="text" 
            placeholder="Confirm Password"
            id="fconfirmpassword" 
            name="fconfirmpassword" 
        />
*/