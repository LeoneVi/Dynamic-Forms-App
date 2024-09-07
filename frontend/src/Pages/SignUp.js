
import React from "react";
import Navbar from "../Components/Navbar";

export default function SignUp() {
   return (
    <div>
    <h2>Sign Up</h2>
    <form>
      <label htmlFor="femail">Email:</label>
      <input type="text" id="femail" name="femail" />
      <label htmlFor="fpassword">Password:</label>
      <input type="text" id="fpassword" name="fpassword" />
      <label htmlFor="fconfirmpassword">Confirm Password:</label>
      <input type="text" id="fconfirmpassword" name="fconfirmpassword" />
      <button type="button">Sign Up</button> 
    </form>
  </div>
   ) 
}
