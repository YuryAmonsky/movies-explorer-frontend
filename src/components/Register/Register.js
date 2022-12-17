import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register() {

  return (
    <AuthForm isRegForm={true}>
      <label className="form__input-label">Имя</label>
      <input 
        className="form__input"
        name="name" id="name"
        type="text" minLength="2"
        required
        autoComplete="off"
      />
      <label className="form__input-label">E-mail</label>
      <input 
        className="form__input"
        name="email"
        id="email"
        type="email"
        required
        autoComplete="off"
      />
      <label className="form__input-label">Пароль</label>
      <input
        className="form__input"
        name="password"
        id="password"
        type="password"
        minLength="8"
        required
        autoComplete="off"
      />
      <span className="form__error-hint">Что-то пошло не так...</span>
    </AuthForm>    
  );
}

export default Register;