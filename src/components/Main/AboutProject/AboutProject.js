import React from "react";
import './AboutProject.css';

function AboutProject(){

  return (
    <section className="description">
      <h2 className="description__title">О проекте</h2>
      <hr className="description__stroke"/>
      <div className="description__text-container">
        <p className="description__paragraph description__paragraph_font_large">Дипломный проект включал 5 этапов</p>
        <p className="description__paragraph description__paragraph_font_small">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div> 
      <div className="description__text-container">
        <p className="description__paragraph description__paragraph_font_large">На выполнение диплома ушло 5 недель</p>
        <p className="description__paragraph description__paragraph_font_small">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="description__time-frame">
        <div className="description__period">
          <p className="description__period-block description__period-block_type_back-end">1 неделя</p>
          <p className="description__period-caption">Back-end</p>
        </div>          
        <div className="description__period">
          <p className="description__period-block description__period-block_type_front-end">4 недели</p>
          <p className="description__period-caption">Front-end</p>
        </div>
      </div> 
    </section>
  );
}

export default AboutProject;