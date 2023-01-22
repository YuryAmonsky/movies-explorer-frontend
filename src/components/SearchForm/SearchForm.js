import React from 'react';
import './SearchForm.css';


function SearchForm({
  request,
  onlyShortFilms,
  onSubmit,
  onRequestChange,
  onFilterChange,
  isFormDisabled
}) {
  const handleRequestChange = (evt) => {
    onRequestChange(evt);
  };
  const HandleFilterChange = (evt) => {
    onFilterChange(evt);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(request, onlyShortFilms);
  }
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__search-container">
        <input
          className="search-form__input"
          name="search"
          type="text"
          placeholder="Фильм"
          onChange={handleRequestChange}
          value={request}
          disabled = {isFormDisabled}
        />
        <button
          className="search-form__submit-button"
          name="searchButton"
          type="submit"
          formMethod="post"
          disabled = {isFormDisabled}
        >
        </button>
      </div>
      <hr className="search-form__stroke" />
      <div className="search-form__filter-container">
        <input
          className="search-form__filter"
          name="filter"
          type="checkbox"
          onChange={HandleFilterChange}
          checked={onlyShortFilms}
          disabled = {isFormDisabled}
        />
        <label className='search-form__filter-label'>Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;