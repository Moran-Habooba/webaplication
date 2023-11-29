import httpService from "./httpService";
import config from "../config.json";
import { refreshTokenHeader } from "./usersService";

refreshTokenHeader();

export async function createCard(card) {
  return await httpService.post(config.apiUrlCreateCard, card);
}

export function getAll() {
  return httpService.get(config.apiUrlAllCards);
}

export function getAllMyCards(id) {
  refreshTokenHeader();

  return httpService.get(`${config.apiUrlAllMyCards}`);
}

export function getCard(id) {
  refreshTokenHeader();
  return httpService.get(`${config.apiUrlCardById}${id}`);
}

export function deleteCard(id) {
  refreshTokenHeader();
  return httpService.delete(`${config.apiUrlDeleteCard}${id}`);
}

export function updateCard(id, card) {
  refreshTokenHeader();
  return httpService.put(`${config.apiUrlUpdateCard}${id}`, card);
}

export function likeCard(id, card) {
  refreshTokenHeader();
  return httpService.patch(`${config.apiUrlLikeCard}${id}`, card);
}
const cardsService = {
  createCard,
  deleteCard,
  getAll,
  getCard,
  updateCard,
  likeCard,
  getAllMyCards,
};

export default cardsService;
