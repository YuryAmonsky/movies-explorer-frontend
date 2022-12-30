import React from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; 
import './Header.css';
import Logo from '../Logo/Logo';

function Header({isLanding, onButtonClick, onBurgerClick}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <header className={`header ${isLanding ? "header_type_landing" : ""}`}>
        <Logo />
        <nav className="nav-bar">
          { !currentUser.isLoggedIn?
            <>
              <NavLink to="/signup" className={`nav-bar__link ${isLanding? "nav-bar__link_type_landing":""}`}>Регистрация</NavLink>
              <button className="nav-bar__button" onClick={onButtonClick}>Войти</button>
            </> :
            <>
              <NavLink 
                to="/movies"
                className={`nav-bar__link nav-bar__link_low-res-hidden ${isLanding? "nav-bar__link_type_landing":""}`}
                activeClassName="nav-bar__link_active"
              >
                Фильмы
              </NavLink>
              <NavLink 
                to="/saved-movies"
                className={`nav-bar__link nav-bar__link_low-res-hidden ${isLanding? "nav-bar__link_type_landing":""}`}
                activeClassName="nav-bar__link_active"
              >
                Сохранённые фильмы
              </NavLink>              
              <NavLink
                to="/profile"
                className={`nav-bar__link nav-bar__link_low-res-hidden nav-bar__link_with-icon ${isLanding? "nav-bar__link_type_landing":""}`} 
                activeClassName="nav-bar__link_active"
              >
                <span>Аккаунт</span>
                <div className="nav-bar__link-icon"></div>
              </NavLink>
              <button className="burger-button" type="button" onClick={onBurgerClick}></button>
            </>
          }
        </nav>
      </header>
    </>
  );

}

export default Header;