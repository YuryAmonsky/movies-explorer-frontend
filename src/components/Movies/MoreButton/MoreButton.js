import React from 'react';
import './MoreButton.css';

function MoreButton({onClick}) {  
  return (
    <div className="more-movies">
        <button className="more-movies-button" type="button" onClick={onClick}>Ещё</button>
    </div>
  );
} 

export default MoreButton;