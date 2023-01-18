import React, { useContext, useEffect, useRef, useState } from 'react';
import './Profile.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidator } from '../../hooks/useFormValidator';
import { NAME_PATTERN } from '../../utils/Constants.js';

function Profile({ isBurgerMenuOpen, onBurgerMenuClose, onEditProfile, onLogout }) {
  let initialState = useRef(true);
  const currentUser = useContext(CurrentUserContext);

  const { inputs, isValid, handleChange, initializeForm } = useFormValidator();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();
    onEditProfile(inputs.name.value, inputs.email.value);
  }
  useEffect(() => {
    if (initialState.current) {
      initializeForm({
        name: { value: currentUser.name, error: '' },
        email: { value: currentUser.email, error: '' },
      });
    }
  }, [currentUser.name, currentUser.email, initializeForm]);

  useEffect(() => {
    if (initialState.current) {
      initialState.current = false;
    } else if (inputs.name && inputs.email) {
      if ((inputs.name.value !== currentUser.name || inputs.email.value !== currentUser.email) && isValid) {
        setSubmitButtonDisabled(false);
      } else {
        setSubmitButtonDisabled(true);
      }
    }
  }, [currentUser, inputs, isValid]);

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <form className="profile" name="profile" onSubmit={handleSubmitButtonClick} noValidate>
        <h1 className="profile__greeting"> {`Привет, ${currentUser.name}`}</h1>
        <div className="profile__input-container">
          <label className="profile__input-label">Имя</label>
          <input
            className="profile__input"
            name="name"
            id="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            pattern={NAME_PATTERN}
            required
            value={inputs.name?.value || ""}
            onInput={handleChange}
          />
        </div>
        <hr className="profile__stroke" />
        <div className="profile__input-container">
          <label className="profile__input-label">E-mail</label>
          <input
            className="profile__input"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            required
            value={inputs.email?.value || ""}
            onInput={handleChange}
          />
        </div>
        <span className="profile__error-hint">{inputs.name?.error}</span>
        <span className="profile__error-hint">{inputs.email?.error}</span>
        <div className="profile__buttons">
          <button
            className="profile__button"
            name="sabmitButton"
            formMethod="post"
            type="submit"
            disabled={submitButtonDisabled || !isValid}
          >Редактировать</button>
          <button
            className="profile__button profile__button_type_exit"
            type="button"
            onClick={onLogout}
          >Выйти из аккаунта</button>
        </div>
      </form>
    </>
  );
}

export default Profile;