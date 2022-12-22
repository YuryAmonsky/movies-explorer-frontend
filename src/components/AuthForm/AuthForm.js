import React from "react";
import { Link } from "react-router-dom";
import './AuthForm.css';
import Logo from "../Logo/Logo";

function AuthForm({ isRegForm, onSubmit, children }) {

  return (
    <form className="form" onSubmit={onSubmit}>
      <header className="form__header">
        <Logo />
        <h1 className="form__title">
          {
            isRegForm ?
              <>Добро пожаловать!</>
              :
              <>Рады видеть!</>
          }
        </h1>
      </header>
      <div className="form__inputs-block">
        {children}
      </div>
      <div className="form__buttons-block">
        <button className="form__submit-button">
          {
            isRegForm ?
              <>Зарегистрироваться</>
              :
              <>Войти</>
          }
        </button>
        <div className="alt-actions">
          <p className="alt-actions__hint">
            {
              isRegForm ?
                <>Уже зарегистрированы?</>
                :
                <>Ещё не зарегистрированы?</>
            }
          </p>
          {
            isRegForm ?
              <Link to="/signin" className="alt-actions__link">Войти</Link>
              :
              <Link to="/signup" className="alt-actions__link">Регистрация</Link>
          }
        </div>
      </div>
    </form>
  );
}

export default AuthForm;