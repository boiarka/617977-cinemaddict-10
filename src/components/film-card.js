import AbstractComponent from './abstract-component.js';


import {
  convertReleaseDate
} from '../utils/filter.js';

const filmCardTemplate = (film) => {
  const {
    title,
    description,
    poster,
    genre,
    runtime,
    totalRating,
    comments,
    watchList,
    alreadyWatched,
    favorite
  } = film;

  const date = convertReleaseDate(film.release.date);

  return (`<article class="film-card">
<h3 class="film-card__title">${title}</h3>
<p class="film-card__rating">${totalRating}</p>
<p class="film-card__info">
	<span class="film-card__year">${date}</span>
	<span class="film-card__duration">${runtime}</span>
	<span class="film-card__genre">${genre}</span>
</p>
<img src="${poster}" alt="" class="film-card__poster">
<p class="film-card__description">${description}</p>
<a class="film-card__comments">${comments.length} comments</a>
<form class="film-card__controls">
	<button
		class = "film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchList ? `film-card__controls-item--active` : ``}" > Add
		to watchlist</button>
	<button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}">Mark as
		watched</button>
	<button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
</form>
</article>`);
};


export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return filmCardTemplate(this._film);
  }

  setClickHandler(selector, handler) {
    this.getElement().querySelector(selector).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
