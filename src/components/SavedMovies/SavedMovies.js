import React, { useContext, useEffect, useRef, useState } from 'react';
import './SavedMovies.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Divider from './Divider/Divider';
import { mainApi } from '../../utils/MainApi';
import { filterMovies } from '../../utils/FilterMovies';

function SavedMovies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  const currentUser = useContext(CurrentUserContext);
  /** Значения переменной requestStatus: isEmpty, 'loading', 'success', 'notFound', 'failed' */
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
      localStorage.removeItem('saved-movies-request');
      localStorage.removeItem('saved-movies-filter');
      return setRequestStatus('isEmpty');
    }
    setRequestStatus('loading');
    const allSavedCards = JSON.parse(localStorage.getItem('saved-movies'));
    const filteredSavedCards = filterMovies(request, allSavedCards, onlyShortFilms, currentUser._id);
    setCards(filteredSavedCards);
    localStorage.setItem('saved-movies-request', request);
    localStorage.setItem('saved-movies-filter', JSON.stringify(onlyShortFilms));

  };

  const handleDeleteCard = (card) => {
    mainApi.deleteCard(card._id)
      .then(() => {
        const savedMovies = cards.filter((c) => c._id !== card._id);
        localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
        setCards(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    mainApi.getCards()
      .then((res) => {
        localStorage.setItem('saved-movies', JSON.stringify(res.data));       
      })
      .catch((err) => {
        setRequestStatus('failed');
      });
  }, []);

  useEffect(() => {
    if (requestStatus === '') {
      let req = '', filter = false;
      if (localStorage.getItem('saved-movies-request')) {
        req = localStorage.getItem('saved-movies-request');
        setRequest(req);
      }
      if (localStorage.getItem('saved-movies-filter')) {
        filter = JSON.parse(localStorage.getItem('saved-movies-filter'));
        setOnlyShortFilms(filter);
      }
      if (localStorage.getItem('saved-movies')) {
        const savedMovies = JSON.parse(localStorage.getItem('saved-movies'));
        setCards(savedMovies);
      } else {
        mainApi.getCards()
          .then((res) => {
            if (res.data.length > 0) {
              localStorage.setItem('saved-movies', JSON.stringify(res.data));
            }
            setCards(res.data);
          })
          .catch((err) => {

          });
      }
    }

    if ((requestStatus === 'success' || requestStatus === 'notFound') && filterChanged.current) {
      filterChanged.current = false;
      const movies = filterMovies(request, [...JSON.parse(localStorage.getItem('saved-movies'))], onlyShortFilms, currentUser._id);
      if (movies.length > 0) {
        localStorage.setItem('saved-movies-request', request);
        localStorage.setItem('saved-movies-filter', onlyShortFilms);
        setCards([...movies]);
        setRequestStatus('success');
      } else {
        localStorage.removeItem('saved-movies-request');
        localStorage.removeItem('saved-movies-filter');
        setRequestStatus('notFound');
      }
    }
  }, [requestStatus, request, onlyShortFilms, currentUser]);

  useEffect(()=>{
    if(cards.length>0){
      setRequestStatus('success');
    }else{
      setRequestStatus('notFound');
    }
  },[cards])

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm 
        request={request}
        onlyShortFilms={onlyShortFilms}
        onSubmit={handleSearch}
        onRequestChange={handleRequestChange}
        onFilterChange={handleFilterChange}
      />
      <section className="saved-movies">
        {requestStatus === 'loading' && <Preloader />}
        {requestStatus === 'success' &&
          <MoviesCardList
            cards={cards}
            cardsToShow={cards.length}
            savedCards={cards}
            isSavedMoviesOpen={true}
            onCardButtonClick={handleDeleteCard}
          />
        }
        {requestStatus === 'isEmpty' &&
          <p className='tooltip'>Нужно ввести ключевое слово</p>}
        {requestStatus === 'notFound' &&
          <p className='tooltip'>Ничего не найдено</p>}
        {requestStatus === 'failed' &&
          <p className='tooltip'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        }
        <Divider />
      </section>
    </>
  );
}

export default SavedMovies;