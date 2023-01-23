import React, { useContext, useEffect, useRef, useState } from 'react';
import './SavedMovies.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Divider from './Divider/Divider';
import { mainApi } from '../../utils/MainApi';
import { filterMovies } from '../../utils/FilterMovies';
import {    
  LS_KEY_SAVED_MOVIES,   
  REQ_STATE_LOADING,
  REQ_STATE_SUCCESS,
  REQ_STATE_FAILED,
  REQ_STATE_NOT_FOUND,
  REQ_STATE_EMPTY,
  ALERT_REQUEST_IS_EMPTY,
  ALERT_NOTHING_FOUND,
  ALERT_GET_MOVIES_FAILED,  
} from '../../utils/Constants';

function SavedMovies({ isBurgerMenuOpen, onBurgerMenuClose, setNotice }) {
  const currentUser = useContext(CurrentUserContext);
  /** Значения переменной requestStatus: 'isEmpty', 'loading', 'success', 'notFound', 'failed' */
  const [requestStatus, setRequestStatus] = useState('');
  const [request, setRequest] = useState('');
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);
  /** cards - отобранные по запросу карточки */
  const [cards, setCards] = useState([]);
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
      return setRequestStatus(REQ_STATE_EMPTY);
    }
    setRequestStatus(REQ_STATE_LOADING);
    const allSavedCards = JSON.parse(localStorage.getItem(LS_KEY_SAVED_MOVIES));
    const filteredCards = filterMovies(allSavedCards, request, onlyShortFilms, null);
    setCards(filteredCards);    
  };

  const handleDeleteCard = (card) => {
    mainApi.deleteCard(card._id)
      .then(() => {
        const savedMovies = cards.filter((c) => c._id !== card._id);
        localStorage.setItem(LS_KEY_SAVED_MOVIES, JSON.stringify(savedMovies));
        setCards(savedMovies);
      })
      .catch((err) => {
        console.log(`${err.statusCode}. ${err.message}`);
        setNotice({ message: err.message, isOpen: true, isSuccess: false });
      });
  }

  useEffect(() => {
    if (requestStatus === '') {      
      if (localStorage.getItem(LS_KEY_SAVED_MOVIES)) {
        const savedMovies = JSON.parse(localStorage.getItem(LS_KEY_SAVED_MOVIES));        
        setCards(savedMovies);
      } else {
        mainApi.getCards()
          .then((res) => {
            /** отбираю только карточки текущего пользователя */
            const userCards = filterMovies(res.data, null, null, currentUser._id);
            localStorage.setItem(LS_KEY_SAVED_MOVIES, JSON.stringify(userCards));            
            setCards(userCards);
          })
          .catch((err) => {
            console.log(`${err.statusCode}. ${err.message}`);            
            setRequestStatus(REQ_STATE_FAILED);
          });
      }
    }

    if ((requestStatus === REQ_STATE_SUCCESS || requestStatus === REQ_STATE_NOT_FOUND || requestStatus === REQ_STATE_EMPTY) && filterChanged.current) {
      filterChanged.current = false;
      const filteredMovies = filterMovies([...JSON.parse(localStorage.getItem(LS_KEY_SAVED_MOVIES))], request, onlyShortFilms, null);      
      setCards([...filteredMovies]);
    }
  }, [requestStatus, request, onlyShortFilms, currentUser, setNotice]);

  useEffect(() => {
    if (cards.length > 0) {
      setRequestStatus(REQ_STATE_SUCCESS);
    } else {
      setRequestStatus(REQ_STATE_NOT_FOUND);
    }
  }, [cards])

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm
        request={request}
        onlyShortFilms={onlyShortFilms}
        onSubmit={handleSearch}
        onRequestChange={handleRequestChange}
        onFilterChange={handleFilterChange}
        isFormDisabled = {requestStatus===REQ_STATE_LOADING? true: false}
      />
      <section className="saved-movies">
        {requestStatus === REQ_STATE_LOADING && <Preloader />}
        {requestStatus === REQ_STATE_SUCCESS &&
          <MoviesCardList
            cards={cards}
            cardsToShow={cards.length}
            savedCards={cards}
            isSavedMoviesOpen={true}
            onCardButtonClick={handleDeleteCard}
          />
        }
        {requestStatus === REQ_STATE_EMPTY &&
          <p className='tooltip'>{ALERT_REQUEST_IS_EMPTY}</p>}
        {requestStatus === REQ_STATE_NOT_FOUND &&
          <p className='tooltip'>{ALERT_NOTHING_FOUND}</p>}
        {requestStatus === REQ_STATE_FAILED &&
          <p className='tooltip'>{ALERT_GET_MOVIES_FAILED}</p>
        }
        <Divider />
      </section>
    </>
  );
}

export default SavedMovies;