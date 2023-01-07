import React from 'react';
import './MovieCard.css';
import {moviesURL} from '../../utils/MoviesApi';


function MovieCard({ card, favorite, isSavedMoviesOpen }) {
  return (
    <li className="movie-card">
      <img className="movie-card__thumbnail" src={`${moviesURL}${card.image.url}`} alt={`Кадр из фильма ${card.nameRU}`}></img>
      <span className="movie-card__caption">{card.nameRU}</span>
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
      <span className="movie-card__duration">{`${Math.floor(card.duration/60)}ч ${card.duration%60}м`}</span>
    </li >
  );
}

export default MovieCard;