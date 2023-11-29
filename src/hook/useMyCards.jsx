import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

// export const useMyCards = () => {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const getCards = async () => {
//       const { data } = await cardsService.getAllMyCards();
//       setCards(data);
//     };

//     getCards();
//   }, []);

//   return cards;
// };

export const useMyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const { data } = await cardsService.getAllMyCards();
    setCards(data);
  };

  return { cards, loadCards }; // החזר את הפונקציה loadCards כדי לאפשר טעינה מחדש של הכרטיסים
};
