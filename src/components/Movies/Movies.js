import React, { useContext, useEffect, useRef, useState } from 'react';
import './Movies.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/FilterMovies';
import useCardListConf from '../../hooks/useCardListConf';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  ALERT_GET_MOVIES_FAILED,
  ALERT_NOTHING_FOUND,
  ALERT_REQUEST_IS_EMPTY,
  LS_KEY_MOVIES,
  LS_KEY_MOVIES_FILTER,
  LS_KEY_MOVIES_FOUND,
  LS_KEY_MOVIES_REQUEST,
  LS_KEY_SAVED_MOVIES,
  REQ_STATE_EMPTY,
  REQ_STATE_FAILED,
  REQ_STATE_INITIAL,
  REQ_STATE_LOADING,
  REQ_STATE_NOT_FOUND,
  REQ_STATE_SUCCESS
} from '../../utils/Constants.js';

function Movies({ isBurgerMenuOpen, onBurgerMenuClose, setNotice }) {
  const currentUser = useContext(CurrentUserContext)
  const { cardListConf } = useCardListConf();
  /** Значения переменной requestStatus: isEmpty, 'loading', 'success', 'notFound', 'failed' */
  const [requestStatus, setRequestStatus] = useState('');
  const [request, setRequest] = useState('');
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);
  /** cards - отобранные по запросу карточки */
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  /** cardsToShow - количество карточек, которое должно быть отображено, 
  также используется для определения необходимости показа кнопки "Еще"*/
  const [cardsToShow, setCardsToShow] = useState(0);
  let filterChanged = useRef(false);


  const handleRequestChange = (evt) => {
    setRequest(evt.target.value);
  };

  const handleFilterChange = (evt) => {
    filterChanged.current = true;
    setOnlyShortFilms(evt.target.checked);
  };


  const handleSearch = (request, onlyShortFilms) => {
    if (request.length === 0) {
      localStorage.removeItem(LS_KEY_MOVIES_REQUEST);
      localStorage.removeItem(LS_KEY_MOVIES_FILTER);
      localStorage.removeItem(LS_KEY_MOVIES_FOUND);
      setRequestStatus(REQ_STATE_EMPTY);
      setCards([]);
      return ;
    }
    setRequestStatus(REQ_STATE_LOADING);

    if (localStorage.getItem(LS_KEY_MOVIES)) {
      localStorage.setItem(LS_KEY_MOVIES_REQUEST, request);
      localStorage.setItem(LS_KEY_MOVIES_FILTER, onlyShortFilms);
      const movies = JSON.parse(localStorage.getItem(LS_KEY_MOVIES));
      const filteredMovies = filterMovies(movies, request, onlyShortFilms, null);
      if (filteredMovies.length > 0) {        
        localStorage.setItem(LS_KEY_MOVIES_FOUND,JSON.stringify(filteredMovies));
        setCards([...filteredMovies]);
        setRequestStatus(REQ_STATE_SUCCESS);
      } else {
        localStorage.removeItem(LS_KEY_MOVIES_FOUND);
        setRequestStatus(REQ_STATE_NOT_FOUND);
        setCards([]);
      }
    } else {
      getMovies()
        .then((res) => {
          localStorage.setItem(LS_KEY_MOVIES, JSON.stringify(res));
          localStorage.setItem(LS_KEY_MOVIES_REQUEST, request);
          localStorage.setItem(LS_KEY_MOVIES_FILTER, onlyShortFilms);
          const filteredMovies = filterMovies([...res], request, onlyShortFilms, null);
          if (filteredMovies.length > 0) {            
            localStorage.setItem(LS_KEY_MOVIES_FOUND,JSON.stringify(filteredMovies));
            setCards([...filteredMovies]);
            setRequestStatus(REQ_STATE_SUCCESS);
          } else {
            localStorage.removeItem(LS_KEY_MOVIES_FOUND);
            setRequestStatus(REQ_STATE_NOT_FOUND);
            setCards([]);
          }
        })
        .catch(() => {
          setRequestStatus(REQ_STATE_FAILED);
        });
    }
  };

  const handleAddCards = () => {
    setCardsToShow(cardsToShow + cardListConf.moreCards)
  }

  const saveCard = (card) => {
    mainApi.saveCard(card)
      .then((res) => {
        const savedMovies = [...savedCards, res.data];
        localStorage.setItem(LS_KEY_SAVED_MOVIES, JSON.stringify(savedMovies));
        setSavedCards(savedMovies);
      })
      .catch((err) => {
        console.log(`${err.statusCode}. ${err.message}`);
        setNotice({ message: err.message, isOpen: true, isSuccess: false });
      });
  }

  const deleteCard = (card) => {
    mainApi.deleteCard(card._id)
      .then(() => {
        const savedMovies = savedCards.filter((c) => c._id !== card._id);
        localStorage.setItem(LS_KEY_SAVED_MOVIES, JSON.stringify(savedMovies));
        setSavedCards(savedMovies);
      })
      .catch((err) => {
        console.log(`${err.statusCode}. ${err.message}`);
        setNotice({ message: err.message, isOpen: true, isSuccess: false });
      });
  }

  const handleFavoriteButtonClick = (card) => {
    const savedCard = savedCards.find((c) => c.movieId === card.id);
    if (savedCard) {
      deleteCard(savedCard);
    } else {
      saveCard(card);
    }
  }

  useEffect(() => {
    if (requestStatus === REQ_STATE_INITIAL) {
      let req = '', durationFilter = false, movies = [];
      if (localStorage.getItem(LS_KEY_MOVIES_REQUEST)) {
        req = localStorage.getItem(LS_KEY_MOVIES_REQUEST);
        setRequest(req);
      }else{
        setRequestStatus(REQ_STATE_INITIAL);
      }
      if (localStorage.getItem(LS_KEY_MOVIES_FILTER)) {
        durationFilter = JSON.parse(localStorage.getItem(LS_KEY_MOVIES_FILTER));
        setOnlyShortFilms(durationFilter);
      }
      if (localStorage.getItem(LS_KEY_MOVIES_FOUND)) {
        movies = JSON.parse(localStorage.getItem(LS_KEY_MOVIES_FOUND));
        setCards([...filterMovies(movies, req, durationFilter, null)]);
        setRequestStatus(REQ_STATE_SUCCESS);
      }else{
        if(req){
          setRequestStatus(REQ_STATE_NOT_FOUND);
        }        
        setCards([]);
      }
      if (localStorage.getItem(LS_KEY_SAVED_MOVIES)) {
        const savedMovies = JSON.parse(localStorage.getItem(LS_KEY_SAVED_MOVIES));
        setSavedCards(savedMovies);
      } else {
        mainApi.getCards()
          .then((res) => {
            const userCards = filterMovies(res.data, null, null, currentUser._id);
            localStorage.setItem(LS_KEY_SAVED_MOVIES, JSON.stringify(userCards));
            setSavedCards(res.data);
          })
          .catch(() => {
            setRequestStatus(REQ_STATE_FAILED);
          });
      }
    }

    if ((requestStatus === REQ_STATE_SUCCESS || requestStatus === REQ_STATE_NOT_FOUND) && filterChanged.current) {
      filterChanged.current = false;
      if (request.length === 0) {
        localStorage.removeItem(LS_KEY_MOVIES_REQUEST);
        localStorage.removeItem(LS_KEY_MOVIES_FILTER);
        localStorage.removeItem(LS_KEY_MOVIES_FOUND);
        setRequestStatus(REQ_STATE_EMPTY);
        setCards([]);
        return ;
      }
      localStorage.setItem(LS_KEY_MOVIES_REQUEST, request);
      localStorage.setItem(LS_KEY_MOVIES_FILTER, onlyShortFilms);
      const filteredMovies = filterMovies([...JSON.parse(localStorage.getItem(LS_KEY_MOVIES))], request, onlyShortFilms, null);
      if (filteredMovies.length > 0) {
        localStorage.setItem(LS_KEY_MOVIES_REQUEST, request);
        localStorage.setItem(LS_KEY_MOVIES_FILTER, onlyShortFilms);
        localStorage.setItem(LS_KEY_MOVIES_FOUND,JSON.stringify(filteredMovies));
        setCards([...filteredMovies]);
        setRequestStatus(REQ_STATE_SUCCESS);
      } else {        
        setRequestStatus(REQ_STATE_NOT_FOUND);
        setCards([]);
      }
    }
  }, [requestStatus, request, onlyShortFilms, currentUser]);

  useEffect(() => {
    if (cardsToShow > 0) {
      const cardsInIncompleteRow = cardsToShow%cardListConf.cardsInRow;
      const cardsMissingToFullLine = cardsInIncompleteRow ? cardListConf.cardsInRow-cardsInIncompleteRow: 0;
      if(cardsInIncompleteRow>0){
        setCardsToShow(cardsToShow+cardsMissingToFullLine);
      }
      return;
    }
    setCardsToShow(cardListConf.maxStartCards);    

  }, [cards, cardListConf, cardsToShow]);

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm
        request={request}
        onlyShortFilms={onlyShortFilms}
        onSubmit={handleSearch}
        onRequestChange={handleRequestChange}
        onFilterChange={handleFilterChange}
        isFormDisabled={requestStatus === REQ_STATE_LOADING ? true : false}
      />
      <section className="movies">
        {requestStatus === REQ_STATE_LOADING && <Preloader />}
        {requestStatus === REQ_STATE_SUCCESS
          && <MoviesCardList
            cards={cards}
            cardsToShow={cardsToShow}
            savedCards={savedCards}
            isSavedMoviesOpen={false}
            onCardButtonClick={handleFavoriteButtonClick}
            onMoreCardsClick={handleAddCards}
          />}
        {requestStatus === REQ_STATE_EMPTY &&
          <p className='tooltip'>{ALERT_REQUEST_IS_EMPTY}</p>}
        {requestStatus === REQ_STATE_NOT_FOUND &&
          <p className='tooltip'>{ALERT_NOTHING_FOUND}</p>}
        {requestStatus === REQ_STATE_FAILED &&
          <p className='tooltip'>{ALERT_GET_MOVIES_FAILED}</p>
        }
      </section>
    </>
  );
}

export default Movies;