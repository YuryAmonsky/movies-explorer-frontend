import React, { useEffect, useRef, useState } from 'react';
import './Movies.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies, getMovies } from '../../utils/MoviesApi';
import useCardListConf from '../../hooks/useCardListConf';

function Movies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  /** request status values: isEmpty, 'loading', 'success', 'notFound', 'failed' */
  const { cardListConf } = useCardListConf();
  const [requestStatus, setRequestStatus] = useState('');
  const [request, setRequest] = useState('');
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(0);  
  let filterChanged = useRef(false);


  const handleRequestChange = (evt) => {
    setRequest(evt.target.value);
  };

  const HandleFilterChange = (evt) => {
    filterChanged.current = true;
    setOnlyShortFilms(evt.target.checked);
  };


  const handleSearch = (request, onlyShortFilms) => {
    if (request.length === 0) {
      localStorage.removeItem('movies-request');
      localStorage.removeItem('movies-filter');
      return setRequestStatus('isEmpty');
    }
    setRequestStatus('loading');
    getMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        const movies = filterMovies(request, [...res], onlyShortFilms);
        if (movies.length > 0) {
          localStorage.setItem('movies-request', request);
          localStorage.setItem('movies-filter', onlyShortFilms);
          setCards([...movies]);
          setRequestStatus('success');
        } else {
          setRequestStatus('notFound');
        }
      })
      .catch(() => {
        setRequestStatus('failed');
      });
  };

  const handleAddCards = (evt) => {
    setCardsToShow(cardsToShow + cardListConf.cardsInRow)
  }

  useEffect(() => {
    if (requestStatus === '') {
      let req = '', filter = false, movies = [];
      if (localStorage.getItem('movies-request')) {
        req = localStorage.getItem('movies-request');
        setRequest(req);
      }
      if (localStorage.getItem('movies-filter')) {
        filter = JSON.parse(localStorage.getItem('movies-filter'));
        setOnlyShortFilms(filter);
      }
      if (localStorage.getItem('movies')) {
        movies = JSON.parse(localStorage.getItem('movies'));
        setCards([...filterMovies(req, movies, filter)]);
        setRequestStatus('success');
      }
    }

    if ((requestStatus === 'success' || requestStatus === 'notFound') && filterChanged.current) {
      filterChanged.current = false;
      const movies = filterMovies(request, [...JSON.parse(localStorage.getItem('movies'))], onlyShortFilms);
      if (movies.length > 0) {
        localStorage.setItem('movies-request', request);
        localStorage.setItem('movies-filter', onlyShortFilms);
        setCards([...movies]);
        setRequestStatus('success');
      } else {
        localStorage.removeItem('movies-request');
        localStorage.removeItem('movies-filter');
        setRequestStatus('notFound');
      }
    }
  }, [requestStatus, request, onlyShortFilms]);

  useEffect(() => {
    if(cardsToShow > 0){
      return;
    }
    if (cards.length <= cardListConf.maxStartCards) {
      setCardsToShow(cards.length);
    } else {
      setCardsToShow(cardListConf.maxStartCards);
    }

  }, [cards, cardListConf, cardsToShow]);

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm
        request={request}
        onlyShortFilms={onlyShortFilms}
        onSubmit={handleSearch}
        onRequestChange={handleRequestChange}
        onFilterChange={HandleFilterChange}
      />
      <section className="movies">
        {requestStatus === 'loading' && <Preloader />}
        {requestStatus === 'success' 
          && <MoviesCardList 
              cards={cards} 
              cardsToShow={cardsToShow} 
              isSavedMoviesOpen={false}
              onMoreCardsClick = {handleAddCards}
            />}
        {requestStatus === 'isEmpty' &&
          <p className='tooltip'>Нужно ввести ключевое слово</p>}
        {requestStatus === 'notFound' &&
          <p className='tooltip'>Ничего не найдено</p>}
        {requestStatus === 'failed' &&
          <p className='tooltip'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        }
      </section>
    </>
  );
}

export default Movies;