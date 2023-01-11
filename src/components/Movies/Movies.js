import React, { useEffect, useRef, useState } from 'react';
import './Movies.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies, getMovies } from '../../utils/MoviesApi';
import useCardListConf from '../../hooks/useCardListConf';
import { mainApi } from '../../utils/MainApi';

function Movies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  /** request status values: isEmpty, 'loading', 'success', 'notFound', 'failed' */
  const { cardListConf } = useCardListConf();
  const [requestStatus, setRequestStatus] = useState('');
  const [request, setRequest] = useState('');
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
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
        localStorage.setItem('movies', JSON.stringify(res.data));
        const movies = filterMovies(request, [...res.data], onlyShortFilms);
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

  const handleAddCards = () => {
    setCardsToShow(cardsToShow + cardListConf.cardsInRow)
  }

  const saveCard = (card) => {
    mainApi.saveCard(card)
      .then((res) => {
        const savedMovies = [...savedCards, res.data];
        localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
        setSavedCards(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteCard = (cardId) => {
    mainApi.deleteCard(cardId)
      .then(() => {
        const savedMovies = savedCards.filter((c) => c._id !== cardId);
        localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
        setSavedCards(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleFavoriteButtonClick = (card) => {

    //TODO определить _id по id
    let savedCard;
    const isSaved = savedCards.some((c) => {
      if(c?.movieId === card.id){
        savedCard = c;
        return true;
      } 
      return false;
    });
    if (isSaved) {
      deleteCard(savedCard._id);
    } else {
      saveCard(card);
    }

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
      if (localStorage.getItem('saved-movies')) {
        const savedMovies = JSON.parse(localStorage.getItem('saved-movies'));
        setSavedCards(savedMovies);
      } else {
        mainApi.getCards()
          .then((res) => {
            if (res.data.length > 0) {
              localStorage.setItem('saved-movies', JSON.stringify(res.data));
            }
            setSavedCards(res.data);
          })
          .catch((err) => {

          });
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
    if (cardsToShow > 0) {
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
            savedCards={savedCards}
            cardsToShow={cardsToShow}
            isSavedMoviesOpen={false}
            onCardButtonClick={handleFavoriteButtonClick}
            onMoreCardsClick={handleAddCards}
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