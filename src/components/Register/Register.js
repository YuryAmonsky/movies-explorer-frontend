import { useFormValidator } from "../../hooks/useFormValidator";
import { NAME_PATTERN } from "../../utils/Constants.js";
import AuthForm from "../AuthForm/AuthForm";

function Register({ onSubmit }) {
  const { inputs, isValid, handleChange } = useFormValidator();

  const handleSubmit = (evt) => {
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
        maxLength="30"
        pattern={NAME_PATTERN}
        required
        autoComplete="off"
        onChange={handleChange}
        value={inputs.name?.value || ""}
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
        onChange={handleChange}
        value={inputs.email?.value || ""}
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
        value={inputs.password?.value || ""}
      />
      <span className="form__error-hint">
        {
          (() => {
            let err = '';
            if (inputs.name?.error) {
              err += inputs.name?.error + '\n\n\r';
            }
            if (inputs.email?.error) {
              err += inputs.email?.error + '\n\n\r';
            }
            if (inputs.password?.error) {
              err += inputs.password?.error;
            }
            return err;
          })()
        }
      </span>
    </AuthForm>
  );
}

export default Register;