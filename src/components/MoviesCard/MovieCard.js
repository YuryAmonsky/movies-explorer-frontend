import React from 'react';
import './MovieCard.css';
import { moviesURL } from '../../utils/MoviesApi';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function MovieCard({ card, savedCards, isSavedMoviesOpen, onButtonClick }) {
  //const currentUser = useContext(CurrentUserContext);
  const isFavorite = savedCards.some(c => c?.movieId === card.id);

  const handleButtonClick = (evt) => {
    evt.preventDefault();
    onButtonClick(card)
  }
  return (
    <li className="movie-card">
      <a className="movie-card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="movie-card__thumbnail" src={`${moviesURL}${card.image.url}`} alt={`Кадр из фильма ${card.nameRU}`}></img>
        <span className="movie-card__caption">{card.nameRU}</span>
        {
          isSavedMoviesOpen ?
            <button
              className="movie-card__button movie-card__button_type_delete"
              type="button"
            >
            </button>
            :
            <button
              className={`movie-card__button movie-card__button_type_favorite${isFavorite ? " movie-card__button_type_favorite-active" : ""}`}
              type="button"
              onClick={handleButtonClick}
            >
            </button>
        }
        <hr className="movie-card__stroke" />
        <span className="movie-card__duration">{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</span>
      </a>
    </li >
  );
}

export default MovieCard;