import React from 'react';
import './Profile.css';

function Profile(){
  return (
    <>      
      <section className="profile">
        <h1 className="profile__greeting"> Привет, Юрий</h1>
        <div className="profile__input-container">
          <label className="profile__input-label">Имя</label>
          <input className="profile__input" type="text" value="Юрий" required/>
        </div>
        <hr className="profile__stroke"/>
        <div className="profile__input-container">
          <label className="profile__input-label">E-mail</label>
          <input className="profile__input" value="pochta@yandex.ru" required/>
        </div>
        <div className="profile__buttons">
          <button className="profile__button" type="submit">Редактировать</button>
          <button className="profile__button profile__button_type_exit" type="button">Выйти из аккаунта</button>
        </div>
      </section>
    </>    
  );
}

export default Profile;