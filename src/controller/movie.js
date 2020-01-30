import Popup from '../components/popup.js';
import FilmCard from '../components/film-card.js';
import MovieModel from '../models/movie.js';

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


const parseFormData = (formData, film) => {
  return new MovieModel({
    'id': film.id,
    'film_info': {
      'title': film.title,
      'alternative_title': film.alternativeTitle,
      'total_rating': film.totalRating,
      'poster': film.poster,
      'age_rating': film.ageRating,
      'director': film.director,
      'writers': film.writers,
      'actors': film.actors,
      'release': film.release,
      'runtime': film.runtime,
      'genre': film.genre,
      'description': film.description,
    },
    'user_details': {
      'personal_rating': film.personalRating,
      'watchlist': Boolean(formData.get(`watchlist`)),
      'already_watched': Boolean(formData.get(`watched`)),
      'watching_date': film.watchingDate,
      'favorite': Boolean(formData.get(`favorite`)),
    },
    'comments': []
  });
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._popup = null;
    this._filmCard = null;
    this.film = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this.film = film;
    const oldFilmComponent = this._filmCard;

    this._filmCard = new FilmCard(film);

    this._filmCard.setClickHandler(`.film-card__poster`, () => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this.setPopupEventsListener(this.film);
    });

    this._filmCard.setClickHandler(`.film-card__title`, () => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this.setPopupEventsListener(this.film);
    });

    this._filmCard.setClickHandler(`.film-card__comments`, () => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this.setPopupEventsListener(this.film);
    });


    this._filmCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        watchList: !film.watchList,
      }));
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        alreadyWatched: !film.alreadyWatched,
      }));
    });

    this._filmCard.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        favorite: !film.favorite,
      }));
    });

    if (oldFilmComponent) {
      replace(this._filmCard, oldFilmComponent);
    } else {
      render(this._container, this._filmCard, RenderPosition.BEFOREEND);
    }

  }

  setPopupEventsListener(film) {
    this._popup.setPopupCloseHandler(() => {
      this._updateFilmCard();
    });

    this._popup.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        watchList: !film.watchList,
      }));
      this.rerenderPopup();
    });

    this._popup.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        alreadyWatched: !film.alreadyWatched,
      }));
      this.rerenderPopup();
    });

    this._popup.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        favorite: !film.watchList,
      }));
      this.rerenderPopup();
    });

  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._popup);
      this._popup = null;
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _updateFilmCard() {
    const formData = this._popup.getData();
    const data = parseFormData(formData, this.film);

    this.setDefaultView();
    this._onDataChange(this, this.film, data);
  }

  destroy() {
    this._filmCard.getElement().remove();
    if (this._popup) {
      this._popup.getElement().remove();
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      this._updateFilmCard();
    }
  }

  _openPopup() {
    this._popup = new Popup(this.film);
    this._onViewChange();

    render(document.body, this._popup, RenderPosition.BEFOREEND);
    this._mode = Mode.POPUP;
    this.setPopupEventsListener(this.film);
  }

  rerenderPopup() {
    remove(this._popup);
    this._openPopup();
  }

}
