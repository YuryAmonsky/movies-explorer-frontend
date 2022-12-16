import React, { useEffect, useState} from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../Movies/MoreButton/MoreButton';

function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    setTimeout(()=>{
        setIsLoading(false);
    },2000);
  },[]);

  return (
    <>            
      <SearchForm />
      <section className="movies">
        {
          isLoading ?
            <Preloader />
          :
            <>
              <MoviesCardList isSavedMoviesOpen = {false}/>
              <MoreButton/>
            </>            
        }
      </section>
    </>
  );
}

export default Movies;