import { useEffect, useState } from "react";

const checkWindowWidth = () => {
  if (window.innerWidth < 540) {
    return { cardsInRow: 1, maxStartCards: 5 };
  }
  if (window.innerWidth >= 540 && window.innerWidth < 768) {
    return { cardsInRow: 2, maxStartCards: 8 };
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    return { cardsInRow: 3, maxStartCards: 9 };
  }
  if (window.innerWidth > 1024) {
    return { cardsInRow: 4, maxStartCards: 12 };
  }
}
function useCardListConf() {
  //const [windowWidth, setWindowWidth] =useState(window.innerWidth);
  const [cardListConf, setCardListConf] = useState(checkWindowWidth());

  useEffect(() => {
    const handleResizeWindow = () => {
      setTimeout(()=>{
        setCardListConf(checkWindowWidth());
      },500);      
    }
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    }
  }, []);

  return { cardListConf }
}

export default useCardListConf;