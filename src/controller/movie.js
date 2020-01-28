import Popup from '../components/popup.js';
import FilmCard from '../components/film-card.js';

import {
  render,
  replace,
  remove,
  RenderPosition
} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._popup = null;
    this._filmCard = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmCard;
    const oldPopupComponent = this._popup;

    this._filmCard = new FilmCard(film);
    this._popup = new Popup(film);

    this._filmCard.setClickHandler(`.film-card__poster`, () => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      render(document.body, this._popup, RenderPosition.BEFOREEND);
      this._toggleMovieToPopup();
    });

    this._filmCard.setClickHandler(`.film-card__title`, () => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      render(document.body, this._popup, RenderPosition.BEFOREEND);
      this._toggleMovieToPopup();
    });

    this._filmCard.setClickHandler(`.film-card__comments`, () => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      render(document.body, this._popup, RenderPosition.BEFOREEND);
      this._toggleMovieToPopup();
    });


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

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._popup.getElement().remove();
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }


  _onEscKeyDown(evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      this.setDefaultView();
    }
  }

  _toggleMovieToPopup() {

    this._mode = Mode.POPUP;
  }

}
