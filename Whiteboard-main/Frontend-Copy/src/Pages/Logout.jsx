import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {

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
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Logout;
