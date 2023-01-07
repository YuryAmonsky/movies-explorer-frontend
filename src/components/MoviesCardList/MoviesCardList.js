import React from 'react';
import './MoviesCardList.css';
import MoreButton from '../Movies/MoreButton/MoreButton';
import MovieCard from '../MoviesCard/MovieCard';

function MoviesCardList({ cards, cardsToShow, isSavedMoviesOpen, onMoreCardsClick}) {
  return (
    <>
      <ul className='card-list'>
        {
          [...cards.slice(0,cardsToShow)].map((card) =>
            <MovieCard key={card.id} card={card} favorite={false} isSavedMoviesOpen={isSavedMoviesOpen}/>
          )
        }
      </ul>
      {
        cards.length > cardsToShow && <MoreButton onClick={onMoreCardsClick}/>
      }
    </>
  );
}

export default MoviesCardList;