import React from 'react';
import promoLogo from '../../../images/logo/landing-logo.svg';
import './Promo.css';

function Promo(){
  return (
    <section className="promo" >           
      <h1 className="promo__title">Учебный&nbsp;проект&nbsp;студента факультета<br className="new-line"/>Веб-разработки.</h1>
      <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <button className="promo__button" type="button">Узнать больше</button>
      <img className="promo__logo" src={promoLogo} alt="силует планеты из слов web"></img>
    </section>    
  );
}

export default Promo;