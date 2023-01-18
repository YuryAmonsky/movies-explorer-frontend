import { useCallback, useState } from "react";
import { validate } from "email-validator";

export const useFormValidator = () => {
  const [inputs, setInputs] = useState({});
  const [isValid, setIsValid] = useState(false)

  const handleChange = (evt) => {
    const input = evt.target;
    const inputValue = input.value;
    const inputName = input.name;
    if (input.name === 'email') {
      if (!validate(inputValue)) {
        input.setCustomValidity('E-mail: Неверный формат адреса');
      } else {
        input.setCustomValidity('');
      }
    } else {
      if (!input.validity.valid) {
        if (input.name === 'name') {
          input.setCustomValidity('Имя: должно состоять из 2х и более символов. Может включать русские, английские буквы. Пробел или дефис могут быть в середине.');
        }
        if (input.name === 'password') {
          input.setCustomValidity('Пароль: должен содержать не менее 8 символов');
        }
      }
    }
    const inputError = input.validationMessage;
    setInputs({ ...inputs, [inputName]: { value: inputValue, error: inputError, } });
    setIsValid(evt.target.closest('form').checkValidity())
    if (input.name !== 'email')
      input.setCustomValidity('');
  }

  const initializeForm = useCallback((objInputs) => {    
    setIsValid(true);
    setInputs(objInputs);
  }, []);

  return { inputs, isValid, handleChange, initializeForm };
}