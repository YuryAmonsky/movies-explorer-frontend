import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import logo from '../../images/logo/logo.svg';
import './Header.css';

function Header(props) {
  return (
    <>      
      <header className={`header ${props.isLanding ? "header_type_landing":""}`}>
        <Link to="/" className="logo">
          <img className="logo-image" src={logo} alt="значок в зеленом кружке" />
        </Link>  
        <nav className="nav-bar">
          {props.isLanding === true ?
            <>
              <NavLink to="/signup" className="nav-bar__link">Регистрация</NavLink>
              <button className="nav-bar__button">Войти</button>
            </>:
            <>
              <NavLink to="/movies" className="nav-bar__link nav-bar__link_theme_light" activeClassName="nav-bar__link_active">Фильмы</NavLink>
              <NavLink to="/saved-movies" className="nav-bar__link nav-bar__link_theme_light" activeClassName="nav-bar__link_active">Сохранённые фильмы</NavLink>
              <NavLink to="/profile" className="nav-bar__link nav-bar__link_theme_light nav-bar__link_w-icon" activeClassName="nav-bar__link_active">
                <span>Аккаунт</span>
                <div className="nav-bar__link-icon"></div>
              </NavLink>
            </>          
          }
        </nav>        
      </header>
    </>
  );

}

export default Header;