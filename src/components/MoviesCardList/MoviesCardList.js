import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';
import './MoviesCardList.css';
import film1 from '../../images/content/33words.png';
import film2 from '../../images/content/100years.png';
import film3 from '../../images/content/banksy.png';
import film4 from '../../images/content/baskia.png';
import film5 from '../../images/content/run.png';
import film6 from '../../images/content/bookmakers.png';
import film7 from '../../images/content/about_germany.png';
import film8 from '../../images/content/gimmy_danger.png';
import film9 from '../../images/content/jenis.png';
import film10 from '../../images/content/before_jump.png';
import film11 from '../../images/content/pj_harvi.png';
import film12 from '../../images/content/on_waves.png';
import film13 from '../../images/content/rudboy.png';
import film14 from '../../images/content/skate.png';
import film15 from '../../images/content/arts_war.png';
import film16 from '../../images/content/zone.png';

function MoviesCardList({isSavedMoviesOpen}) {  
  return (
    <>
      {
        isSavedMoviesOpen ?
          <ul className='card-list'>
            <li>
              <MovieCard
                link={film1}
                caption='33 слова о дизайне'
                favorite={true}
                duration='1ч 42м'
                isSavedMoviesOpen = {true}
              />
            </li>
              <MovieCard
                link={film2}
                caption='Киноальманах «100 лет дизайна»'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {true}
              />
            <li>
              <MovieCard
                link={film3}
                caption='В погоне за Бенкси'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {true}
              /> 
            </li>                        
          </ul>
        :
          <ul className='card-list'>
            <li>
              <MovieCard
                link={film1}
                caption='33 слова о дизайне'
                favorite={true}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>
            <li>
              <MovieCard
                link={film2}
                caption='Киноальманах «100 лет дизайна»'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>            
            <li>
              <MovieCard
                link={film3}
                caption='В погоне за Бенкси'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>            
            <li>
              <MovieCard
                link={film4}
                caption='Баския: Взрыв реальности'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              /> 
            </li>            
            <li>
              <MovieCard
                link={film5}
                caption='Бег это свобода'
                favorite={true}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />  
            </li>            
            <li>
              <MovieCard
                link={film6}
                caption='Книготорговцы'
                favorite={true}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />  
            </li>            
            <li>
              <MovieCard
                link={film7}
                caption='Когда я думаю о Германии ночью'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />  
            </li>            
            <li>
              <MovieCard
                link={film8}
                caption='Gimme Danger: История Игги и The Stooges'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>            
            <li>
              <MovieCard
                link={film9}
                caption='Дженис: Маленькая девочка грустит'
                favorite={true}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />  
            </li>            
            <li>
              <MovieCard
                link={film10}
                caption='Соберись перед прыжком'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              /> 
            </li>            
            <li>
              <MovieCard
                link={film11}
                caption='Пи Джей Харви: A dog called money'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />  
            </li>            
            <li>
              <MovieCard
                link={film12}
                caption='По волнам: Искусство звука в кино'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>            
            <li>
              <MovieCard
                link={film13}
                caption='Рудбой'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>            
            <li>
              <MovieCard
                link={film14}
                caption='Скейт — кухня'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />    
            </li>            
            <li>
              <MovieCard
                link={film15}
                caption='Война искусств'
                favorite={false}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />  
            </li>            
            <li>
              <MovieCard
                link={film16}
                caption='Зона'
                favorite={true}
                duration='1ч 42м'
                isSavedMoviesOpen = {false}
              />
            </li>            
          </ul>
      }      
    </>
  );
}

export default MoviesCardList;