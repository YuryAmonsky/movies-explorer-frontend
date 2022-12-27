import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';

function Header(props) {

  return (
    <>
      <header className={`header ${props.isLanding ? "header_type_landing" : ""}`}>
        <Logo />
        <nav className="nav-bar">
          {props.isLanding === true ?
            <>
              <NavLink to="/signup" className="nav-bar__link">Регистрация</NavLink>
              <button className="nav-bar__button" onClick={props.onButtonClick}>Войти</button>
            </> :
            <>
              <NavLink to="/movies" className="nav-bar__link nav-bar__link_theme_light" activeClassName="nav-bar__link_active">Фильмы</NavLink>
              <NavLink to="/saved-movies" className="nav-bar__link nav-bar__link_theme_light" activeClassName="nav-bar__link_active">Сохранённые фильмы</NavLink>
              <NavLink to="/profile" className="nav-bar__link nav-bar__link_theme_light nav-bar__link_with-icon" activeClassName="nav-bar__link_active">
                <span>Аккаунт</span>
                <div className="nav-bar__link-icon"></div>
              </NavLink>
              <button className="burger-button" type="button" onClick={props.onBurgerClick}></button>
            </>
          }
        </nav>
      </header>
    </>
  );

}

export default Header;