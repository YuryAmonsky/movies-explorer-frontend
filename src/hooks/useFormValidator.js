import { useCallback, useState } from "react";
import { validate } from "email-validator";
import { INVLAID_EMAIL, INVLAID_NAME, INVLAID_PASSWORD } from "../utils/Constants";

export const useFormValidator = () => {
  const [inputs, setInputs] = useState({});
  const [isValid, setIsValid] = useState(false)

  const handleChange = (evt) => {
    const input = evt.target;
    const inputValue = input.value;
    const inputName = input.name;
    if (input.name === 'email') {
      if (!validate(inputValue)) {
        input.setCustomValidity(INVLAID_EMAIL);
      } else {
        input.setCustomValidity('');
      }
    } else {
      if (!input.validity.valid) {
        if (input.name === 'name') {
          input.setCustomValidity(INVLAID_NAME);
        }
        if (input.name === 'password') {
          input.setCustomValidity(INVLAID_PASSWORD);
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