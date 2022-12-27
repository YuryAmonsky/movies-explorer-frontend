import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../../images/logo/logo.svg';
import './Logo.css';

function Logo(){
  return(
    <Link to="/" className="logo">
      <img className="logo-image" src={logo} alt="значок в зеленом кружке" />
    </Link> 
  );
}

export default Logo;