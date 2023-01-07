import React from 'react';
import './SavedMovies.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Divider from './Divider/Divider';

function SavedMovies({ isBurgerMenuOpen, onBurgerMenuClose, isLoading }) {

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm />
      <section className="saved-movies">
        {
          isLoading ?
            <Preloader />
            :
            <MoviesCardList isSavedMoviesOpen={true} /> 
        }
        <Divider/>
      </section>
    </>
  );
}

export default SavedMovies;