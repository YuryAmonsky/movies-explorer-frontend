import React from "react";
import './BurgerMenu.css';
import { NavLink } from "react-router-dom";

function BurgerMenu({ isOpen, onClose }) {
  return (
    <div className={`burger-menu-container ${isOpen ? "burger-menu-container_open" : ""}`}>
      <nav className="burger-menu">
        <button className="burger-menu__close-button" type="button" onClick={onClose}></button>
        <ul className="burger-menu__links">
          <li>
            <NavLink exact to="/" className="burger-menu__link" activeClassName="burger-menu__active-link">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="burger-menu__link" activeClassName="burger-menu__active-link">Фильмы</NavLink>
          </li>
          <li>
            <NavLink to="/saved-movies" className="burger-menu__link" activeClassName="burger-menu__active-link">Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="burger-menu__link burger-menu__link_with-icon" activeClassName="burger-menu__active-link">
          <span className="burger-menu__link-text">Аккаунт</span>
          <div className="burger-menu__link-icon"></div>
        </NavLink>
      </nav>
    </div>
  );
}

export default BurgerMenu;
