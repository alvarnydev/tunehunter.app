import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-red-400'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/About'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
