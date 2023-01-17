import React from "react";
import { useFormValidator } from "../../hooks/useFormValidator";
import NAME_PATTERN from "../../utils/Constants,js";
import AuthForm from "../AuthForm/AuthForm";

function Register({onSubmit}) {
  const {inputs, isValid, handleChange} = useFormValidator();
  /*onst [name, setName] =useState('');
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
*/
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    onSubmit(inputs.name.value, inputs.email.value, inputs.password.value);
  }

  return (
    <AuthForm isRegForm={true} onSubmit={handleSubmit} isValid={isValid}>
      <label className="form__input-label">Имя</label>
      <input 
        className="form__input"
        name="name"
        id="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        pattern={NAME_PATTERN}
        required
        autoComplete="off"
        onChange = {handleChange}
        value = {inputs.name?.value||""} 
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
        onChange = {handleChange}
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
        onChange = {handleChange}
        value = {inputs.password?.value||""}
      />
      <span className="form__error-hint">{inputs.name?.error}</span>
      <span className="form__error-hint">{inputs.email?.error}</span>
      <span className="form__error-hint">{inputs.password?.error}</span>
    </AuthForm>    
  );
}

export default Register;