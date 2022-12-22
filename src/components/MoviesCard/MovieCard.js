import React from 'react';
import './MovieCard.css';


function MovieCard({ link, caption, favorite, duration, isSavedMoviesOpen }) {
  return (
    <li className="movie-card">
      <img className="movie-card__thumbnail" src={link} alt=""></img>
      <span className="movie-card__caption">{caption}</span>
      {
        isSavedMoviesOpen ?
          <button
            className="movie-card__button movie-card__type_delete"
            type="button"
          >
          </button>
        :
          <button
            className={`movie-card__button movie-card__type_favorite${favorite ? " movie-card__type_favorite-active" : ""}`}
            type="button"
          >
          </button>
      }
      <hr className="movie-card__stroke" />
      <span className="movie-card__duration">{duration}</span>
    </li >
  );
}

export default MovieCard;