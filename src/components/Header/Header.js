import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../../images/logo/logo.svg';
import './Header.css';

function Header(props) {
  return (
    <>      
      <header className="header">
        <img className="logo" src={logo} alt="значок в зеленом кружке" />
        <nav className="nav-bar">
          {props.isLanding ?
            <>
              <Link to="/sign-up" className="nav-bar__link">Регистрация</Link>
              <button className="nav-bar__button">Войти</button>
            </>:
            <>
            </>
          
          }
        </nav>        
      </header>
    </>
  );

}

export default Header;