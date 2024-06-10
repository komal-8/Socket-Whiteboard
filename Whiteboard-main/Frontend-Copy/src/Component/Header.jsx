import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/Images/logo.png';
import '../../public/Css/style.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const userId = localStorage.getItem('userId');
  console.log(userId)
  const navigate =useNavigate();  
  // Function to clear userId from localStorage
  const clearUserIdFromLocalStorage = () => {
    localStorage.removeItem('userId');
    navigate('/')
  };

  // Call the function to clear userId from localStorage when user logs out or session expires
  const handleLogout = () => {
    clearUserIdFromLocalStorage();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to='/blog' className="nav-link">BLOG</Link>
            </li>
            <li className="nav-item">
              <Link to='/resources' className="nav-link">RESOURCES</Link>
            </li>
            <li className="nav-item">
              <Link to='/pricing' className="nav-link">PRICING</Link>
            </li>
            <li className="nav-item ">
              <Link to='/try' className="nav-link">TRY IT NOW</Link>
            </li>
            <li className="nav-item ">
            {userId!==null?<Link to='' onClick={handleLogout} className="nav-link">LOGOUT</Link>:<Link to='/login' className="nav-link">LOGIN</Link>}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
