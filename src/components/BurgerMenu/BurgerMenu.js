import React from "react";
import './BurgerMenu.css';
import { NavLink } from "react-router-dom";

function BurgerMenu(props){
  return(
    <nav className={`burger-menu ${props.isOpen ? "burger-menu_open":""}`}>
      <button className="burger-menu__close-button" type="button" onClick={props.onClick}></button>
      <ul className="burger-menu__links">
        <li>
          <NavLink to="/" className="burger-menu__link" activeClassName="burger-menu__active-link">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/" className="burger-menu__link" activeClassName="burger-menu__active-link">Фильмы</NavLink>
        </li>
        <li>
          <NavLink to="/" className="burger-menu__link" activeClassName="burger-menu__active-link">Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <NavLink to="/" className="burger-menu__link burger-menu__link_with-icon" activeClassName="burger-menu__active-link">
        <span className="burger-menu__link-text">Аккаунт</span>
        <div className="burger-menu__link-icon"></div>
      </NavLink>
    </nav>
  );
}

export default BurgerMenu;
