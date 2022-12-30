import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({onSubmit}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (evt)=>{
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt)=>{
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    onSubmit(email, password);
  }

  return (
    <AuthForm isRegForm={false} onSubmit={handleSubmit}>      
      <label className="form__input-label">E-mail</label>
      <input
        className="form__input"
        name="email"
        id="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="off"
        onChange={handleEmailChange}
        value = {email}
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
        onChange={handlePasswordChange}
        value = {password}
      />
      <span className="form__error-hint">Что-то пошло не так...</span>
    </AuthForm>    
  );
}

export default Login;