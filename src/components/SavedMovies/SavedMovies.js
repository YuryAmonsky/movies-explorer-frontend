import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    setTimeout(()=>{
        setIsLoading(false);
    },2000);
  },[]);
  return (
    <>      
      <SearchForm />
      <section className="saved-movies">
        {
          isLoading ?
            <Preloader />
            :
            <MoviesCardList isSavedMoviesOpen = {true}/>
        }
      </section>
    </>
  );
}

export default SavedMovies;