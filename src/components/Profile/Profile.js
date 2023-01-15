import React, { useContext, useEffect, useRef, useState } from 'react';
import './Profile.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ isBurgerMenuOpen, onBurgerMenuClose, onEditProfile, onLogout }) {
  let initialState = useRef(true);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();
    onEditProfile(name, email);
  }

  useEffect(() => {
    if (initialState.current) {      
      initialState.current = false;      
      setName(currentUser.name);
      setEmail(currentUser.email);
    } else {      
      if (name !== currentUser.name || email !== currentUser.email) {
        setSubmitButtonDisabled(false);
      }else{
        setSubmitButtonDisabled(true);
      }
    }
  }, [name, email, currentUser.name, currentUser.email]);

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <form className="profile" name="profile" onSubmit={handleSubmitButtonClick}>
        <h1 className="profile__greeting"> {`Привет, ${currentUser.name}`}</h1>
        <div className="profile__input-container">
          <label className="profile__input-label">Имя</label>
          <input className="profile__input" type="text" value={name} required onInput={handleChangeName} />
        </div>
        <hr className="profile__stroke" />
        <div className="profile__input-container">
          <label className="profile__input-label">E-mail</label>
          <input className="profile__input" value={email} required onInput={handleChangeEmail} />
        </div>
        <div className="profile__buttons">
          <button className="profile__button" name="sabmitButton" formMethod="post" type="submit" disabled={submitButtonDisabled}>Редактировать</button>
          <button className="profile__button profile__button_type_exit" type="button" onClick={onLogout}>Выйти из аккаунта</button>
        </div>
      </form>
    </>
  );
}

export default Profile;