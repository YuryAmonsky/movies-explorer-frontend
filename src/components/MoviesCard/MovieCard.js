import React from 'react';
import './MovieCard.css';


function MovieCard({link, caption, favorite, duration}){
  return(
    <li className="movie-card">
      <img className="movie-card__thumbnail" src={link} alt=""></img>
      <span className="movie-card__caption">{caption}</span>
      <button className={`movie-card__favourite-button${favorite? " movie-card__favourite-button_active":""}`} type="button"></button>
      <hr className="movie-card__stroke"/>
      <span className="movie-card__duration">{duration}</span>
    </li>
  );
}

export default MovieCard;