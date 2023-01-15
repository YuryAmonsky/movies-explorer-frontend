import React from 'react';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


function Main({ isBurgerMenuOpen, onBurgerMenuClose }){
  const handlePromoButtonClick = (yCoord)=>{
    window.scrollTo({
      top: yCoord,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <Promo onButtonClick={handlePromoButtonClick}/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
    </>    
  );
}

export default Main;