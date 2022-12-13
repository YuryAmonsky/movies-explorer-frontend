import React from 'react';
// import {Link} from 'react-router-dom';
import './AboutMe.css';
import photo from '../../../images/content/ava.jpg';

function AboutMe(){
  
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <hr className="about-me__stroke"/>
      <div className="about-me__resume-container">
        <p className="about-me__name">Юрий</p>
        <p className="about-me__props">Фронтенд-разработчик, 40 лет</p>
        <p className="about-me__resume">Я по образованию инженер автоматизированных систем обработки информации, живу в подмосковном Ступино. 
        С 2004 года работал по специальности. Решил немного сменить сферу деятельности. В 2022 году прошел курс Веб-разработчик. 
        Сейчас моя цель - стать профессиональным frontend разработчиком.
        </p>
        <a href={'https://github.com/YuryAmonsky'} target="_blank" rel="noreferrer" className="about-me__link">Github</a>
        <img className="about-me__photo" src={photo} alt=""></img>
      </div>
      <div className="portfolio">
        <h3 className='portfolio__title'>Портфолио</h3>
        <ul className='portfolio__links'>
          <li>
            <a href={'https://yuryamonsky.github.io/how-to-learn/'} target="_blank" rel="noreferrer" className="portfolio__link">
              <span>Статичный сайт</span>
              <span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
          <hr className="portfolio__stroke"/>
          <li>
            <a href={'https://yuryamonsky.github.io/russian-travel/'} target="_blank" rel="noreferrer" className="portfolio__link">              
              <span>Адаптивный сайт</span>
              <span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
          <hr className="portfolio__stroke"/>
          <li>
            <a href={'https://amo.edu.nomoredomains.icu'} target="_blank" rel="noreferrer" className="portfolio__link">              
              <span>Одностраничное приложение</span>
              <span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;