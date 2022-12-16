import React from 'react';
import './SearchForm.css';


function SearchForm(){
  return(
    <form className="search-form">
      <div className="search-form__search-container">
        <input  className="search-form__input"  type="text" placeholder="Фильм" required/>
        <button className="search-form__submit-button"></button>
      </div>      
      <hr className="search-form__stroke"/> 
      <div className="search-form__filter-container">
        <input className="search-form__filter" type="checkbox" />
        <label className='search-form__filter-label'>Короткометражки</label>
      </div>           
    </form>    
  );
}

export default SearchForm;