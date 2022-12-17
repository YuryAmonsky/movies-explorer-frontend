import React from "react";
import { useHistory } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  }
  return (
    <div className="page-404">
      <div>
        <h1 className="page-404__title">404</h1>
        <p className="page-404__message">Страница не найдена</p>
      </div>      
      <button className="page-404__back-button" onClick={goBack}>Назад</button>
    </div>
  );
}

export default PageNotFound;