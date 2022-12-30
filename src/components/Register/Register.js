import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({onSubmit}) {
  const [name, setName] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleNameChange = (evt)=>{
    setName(evt.target.value);
  }
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
    <AuthForm isRegForm={true} onSubmit={handleSubmit}>
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
        onChange = {handleNameChange}
        value = {name} 
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
        onChange = {handleEmailChange}
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
        onChange = {handlePasswordChange}
        value = {password}
      />
      <span className="form__error-hint">Что-то пошло не так...</span>
    </AuthForm>    
  );
}

export default Register;