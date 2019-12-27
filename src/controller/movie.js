import Popup from '../components/popup.js';
import FilmCard from '../components/film-card.js';

import {
  render,
  replace,
  remove,
  RenderPosition
} from '../utils/render.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this._onDataChange = onDataChange;

    this._popup = null;
    this._filmCard = null;
  }

  render(film) {
    const oldFilmComponent = this._filmCard;
    const oldPopupComponent = this._popup;

    this._filmCard = new FilmCard(film);
    this._popup = new Popup(film);

    this._filmCard.setClickHandler(`.film-card__poster`, () => {
      render(document.body, this._popup, RenderPosition.BEFOREEND);
    });
    this._filmCard.setClickHandler(`.film-card__title`, () => {
      render(document.body, this._popup, RenderPosition.BEFOREEND);
    });
    this._filmCard.setClickHandler(`.film-card__comments`, () => {
      render(document.body, this._popup, RenderPosition.BEFOREEND);
    });


    // this._popup.setClickHandler(`.film-details__close-btn`, () => {
    //   this._popup.getElement().remove();
    // });

    // this._popup.setWatchlistButtonClickHandler((evt) => {
    //   evt.preventDefault();
    //   this._onDataChange(this, film, Object.assign({}, film, {
    //     isWatchlist: !film.isWatchlist,
    //   }));
    // });


    // this._popup.setWatchedButtonClickHandler((evt) => {
    //   evt.preventDefault();
    //   this._onDataChange(this, film, Object.assign({}, film, {
    //     isWatched: !film.isWatched,
    //   }));
    // });


    // this._popup.setFavoriteButtonClickHandler((evt) => {
    //   evt.preventDefault();
    //   this._onDataChange(this, film, Object.assign({}, film, {
    //     isFavorite: !film.isFavorite,
    //   }));
    // });


    this._filmCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCard.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });


    if (oldFilmComponent && oldPopupComponent) {
      replace(this._filmCard, oldFilmComponent);
      replace(this._popup, oldPopupComponent);
    } else {
      render(this._container, this._filmCard, RenderPosition.BEFOREEND);
    }
  }

}
