import { useEffect } from 'react';
import './MovieCard.css';
import { BEATFILM, MINUTES_IN_HOUR } from '../../utils/Constants';

function MovieCard({ card, isFavorite, isSavedMoviesOpen, onButtonClick }) {
  
  const handleButtonClick = (evt) => {
    evt.preventDefault();
    onButtonClick(card)
  }

  useEffect(()=>{
    if(isSavedMoviesOpen){
      
    }
  },[isSavedMoviesOpen])
  return (
    <li className="movie-card">
      <a className="movie-card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img 
          className="movie-card__thumbnail"
          src={!isSavedMoviesOpen? `${BEATFILM}${card.image.url}`: card.image}
          alt={`Кадр из фильма ${card.nameRU}`}
        >          
        </img>
        <span className="movie-card__caption">{card.nameRU}</span>
        <button
          className={`movie-card__button ${isSavedMoviesOpen ? "movie-card__button_type_delete" :
            isFavorite ? " movie-card__button_type_favorite-active" : "movie-card__button_type_favorite"}`
          }  
          type="button"
          onClick={handleButtonClick}
        >
        </button>           
        <hr className="movie-card__stroke" />
        <span className="movie-card__duration">{`${Math.floor(card.duration / MINUTES_IN_HOUR)}ч ${card.duration % MINUTES_IN_HOUR}м`}</span>
      </a>
    </li >
  );
}

export default MovieCard;