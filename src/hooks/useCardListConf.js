import { useEffect, useState } from "react";
import {
  CARDS_IN_ROW_RES_320_540,
  CARDS_IN_ROW_RES_540_768,
  CARDS_IN_ROW_RES_768_1024,
  CARDS_IN_ROW_RES_MORE_1024,
  MAX_START_CARDS_RES_320_540,
  MAX_START_CARDS_RES_540_768,
  MAX_START_CARDS_RES_768_1024,
  MAX_START_CARDS_RES_MORE_1024,
  MORE_CARDS_RES_320_540,
  MORE_CARDS_RES_540_768,
  MORE_CARDS_RES_768_1024,
  MORE_CARDS_RES_MORE_1024,
  RESIZE_DELAY,
  RES_1024,
  RES_540,
  RES_768
} from "../utils/Constants";

const checkWindowWidth = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth <= RES_540) {
    return { 
      cardsInRow: CARDS_IN_ROW_RES_320_540, 
      maxStartCards: MAX_START_CARDS_RES_320_540, 
      moreCards: MORE_CARDS_RES_320_540 
    };
  }
  if (windowWidth > RES_540 && windowWidth <= RES_768) {
    return { 
      cardsInRow: CARDS_IN_ROW_RES_540_768, 
      maxStartCards: MAX_START_CARDS_RES_540_768, 
      moreCards: MORE_CARDS_RES_540_768 
    };
  }
  if (windowWidth > RES_768 && windowWidth <= RES_1024) {
    return { 
      cardsInRow: CARDS_IN_ROW_RES_768_1024, 
      maxStartCards: MAX_START_CARDS_RES_768_1024, 
      moreCards: MORE_CARDS_RES_768_1024 };
  }
  if (windowWidth > RES_1024) {    
    return { 
      cardsInRow: CARDS_IN_ROW_RES_MORE_1024, 
      maxStartCards: MAX_START_CARDS_RES_MORE_1024, 
      moreCards: MORE_CARDS_RES_MORE_1024 };
  }
}
function useCardListConf() {
  const [cardListConf, setCardListConf] = useState(checkWindowWidth());

  useEffect(() => {
    const handleResizeWindow = () => {
      setTimeout(() => {
        setCardListConf(checkWindowWidth());
      }, RESIZE_DELAY);
    }
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    }
  }, []);

  return { cardListConf }
}

export default useCardListConf;