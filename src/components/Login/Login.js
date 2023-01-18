import React from "react";
import { useFormValidator } from "../../hooks/useFormValidator";
import AuthForm from "../AuthForm/AuthForm";

function Login({onSubmit}) {
  const {inputs, isValid, handleChange} = useFormValidator();
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    onSubmit(inputs.email.value, inputs.password.value);
  }

  return (
    <AuthForm isRegForm={false} onSubmit={handleSubmit} isValid={isValid}>      
      <label className="form__input-label">E-mail</label>
      <input
        className="form__input"
        name="email"
        id="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="off"
        onChange={handleChange}
        value = {inputs.email?.value||""}
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
        onChange={handleChange}
        value = {inputs.password?.value||""}
      />
      <span className="form__error-hint">{inputs.email?.error}</span>
      <span className="form__error-hint">{inputs.password?.error}</span>
    </AuthForm>    
  );
}

export default Login;