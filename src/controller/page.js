import FilmCard from '../components/film-card.js';
import Popup from '../components/popup.js';

import {
  render,
  RenderPosition
} from '../utils/render.js';


const renderFilm = (film, where) => {
  const filmElement = new FilmCard(film);
  const popupElement = new Popup(film);

  filmElement.setClickHandler(`.film-card__poster`, () => {
    render(document.body, popupElement, RenderPosition.BEFOREEND);
  });
  filmElement.setClickHandler(`.film-card__title`, () => {
    render(document.body, popupElement, RenderPosition.BEFOREEND);
  });
  filmElement.setClickHandler(`.film-card__comments`, () => {
    render(document.body, popupElement, RenderPosition.BEFOREEND);
  });

  popupElement.setClickHandler(`.film-details__close-btn`, () => {
    popupElement.getElement().remove();
  });

  render(where, filmElement, RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmComponent = new FilmCard();
    this._popupComponent = new Popup();
  }
  render(films, countStart, countEnd) {
    const container = this._container;

    films.slice(countStart, countEnd).forEach((item) => {
      renderFilm(item, container);
    });

  }
}
