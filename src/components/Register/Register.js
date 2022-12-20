import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({onSubmit}) {

  return (
    <AuthForm isRegForm={true} onSubmit={onSubmit}>
      <label className="form__input-label">Имя</label>
      <input 
        className="form__input"
        name="name"
        id="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        required
        autoComplete="off"
      />
      <label className="form__input-label">E-mail</label>
      <input 
        className="form__input"
        name="email"
        id="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="off"
      />
      <label className="form__input-label">Пароль</label>
      <input
        className="form__input"
        name="password"
        id="password"
        type="password"
        placeholder="Пароль"
        minLength="8"
        required
        autoComplete="off"
      />
      <span className="form__error-hint">Что-то пошло не так...</span>
    </AuthForm>    
  );
}

export default Register;