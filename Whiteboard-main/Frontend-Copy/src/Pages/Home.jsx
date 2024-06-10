import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';

function Home() {
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <br />
      {/* Conditionally render the Link based on userId */}
      {userId == null ? (
        <button>
          <Link to='/login'>START FOR FREE</Link>
        </button>
      ) : null}
    </div>
  );
}

export default Home;
