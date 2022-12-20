import React, { useEffect, useState } from 'react';
import './Movies.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Movies/MoreButton/MoreButton';

function Movies({ isBurgerMenuOpen, onBurgerMenuClose }) {
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
      <section className="movies">
        {
          isLoading ?
            <Preloader />
            :
            <>
              <MoviesCardList isSavedMoviesOpen={false} />
              <MoreButton />
            </>
        }
      </section>
    </>
  );
}

export default Movies;