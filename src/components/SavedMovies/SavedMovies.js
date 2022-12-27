import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Divider from './Divider/Divider';

function SavedMovies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
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