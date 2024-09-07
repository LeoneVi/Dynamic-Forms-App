import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const BACKEND = "http://localhost:4000/login"

async function submit(e) {
    e.preventDefault()
    const res = await fetch(BACKEND, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "email": e.target.femail.value,
            "password": e.target.fpassword.value
        })
    })
    console.log(res)

}
// </* form action="http://localhost:4000/login" method = "POST" >

export default function Login() {

  return (
    <div>
      <h2>Login Page</h2>
     
      <form onSubmit = {submit}>
        <label htmlFor="femail">Email:</label>
        <input type="text" id="femail" name="femail" />
        <label htmlFor="fpassword">Password:</label>
        <input type="text" id="fpassword" name="fpassword" />
        <button type="submit">Login</button> 
      </form>
    </div>
  );
}
