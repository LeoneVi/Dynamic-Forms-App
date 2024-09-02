import React from "react";
import { useState } from "react"
import { HiOutlineBars3 } from "react-icons/hi2"

const Logo = () => {
    <p>Logo Goes Here</p>
}

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const menuOptions = [

  ]
  return <nav>
    <div className="nav-logo-container">
       <img src={Logo} alt="" />
    </div>
    <div className="navbar-links-container">
        <button className="primary-button">Sign In</button>
    </div>
    <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
  </nav>;
}

export default Navbar;