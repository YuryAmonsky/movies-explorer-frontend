import React from 'react';
import './MoviesCardList.css';
import MoreButton from '../Movies/MoreButton/MoreButton';
import MovieCard from '../MoviesCard/MovieCard';

function MoviesCardList({ cards, savedCards, cardsToShow, isSavedMoviesOpen, onCardButtonClick, onMoreCardsClick }) {
  return (
    <>
      <ul className='card-list'>
        {
          cards.slice(0, cardsToShow).map((card) => {
            const isFavorite = savedCards.some(c => c?.movieId === card.id);
            return (
              <MovieCard
                key={!isSavedMoviesOpen? card.id: card.movieId}
                card={card}
                isFavorite={isFavorite}
                isSavedMoviesOpen={isSavedMoviesOpen}
                onButtonClick={onCardButtonClick}
              />
            )
          })
        }
      </ul>
      {
        cards.length > cardsToShow && <MoreButton onClick={onMoreCardsClick} />
      }
    </>
  );
}

export default MoviesCardList;