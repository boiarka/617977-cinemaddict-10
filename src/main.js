'use strict';

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const filmSectionTemplate = () => {
  return (
    `<section class="films">
			<section class="films-list">
					<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
					<div class="films-list__container">
					</div>
					<button class="films-list__show-more">Show more</button>
			</section>
	</section>`
  );
};

const topRatedTemplate = () => {
  return (
    `<section class="films-list--extra" id="top-rated">
				<h2 class="films-list__title">Top rated</h2>
				<div class="films-list__container">
				</div>
		</section>`
  );
};

const mostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra" id="most-commented">
		<h2 class="films-list__title">Most commented</h2>
		<div class="films-list__container">
		</div>
		</section>`
  );
};

const filmCardTemplate = () => {
  return (
    `<article class="film-card">
				<h3 class="film-card__title">Sagebrush Trail</h3>
				<p class="film-card__rating">3.2</p>
				<p class="film-card__info">
						<span class="film-card__year">1933</span>
						<span class="film-card__duration">54m</span>
						<span class="film-card__genre">Western</span>
				</p>
				<img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
				<p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
				<a class="film-card__comments">89 comments</a>
				<form class="film-card__controls">
						<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
						<button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
						<button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
				</form>
		</article>`
  );
};

const headerProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

const navTemplate = () => {
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

const sortTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, headerProfileTemplate(), `beforeend`);
render(mainElement, navTemplate(), `beforeend`);
render(mainElement, sortTemplate(), `beforeend`);
render(mainElement, filmSectionTemplate(), `beforeend`);

const filmListElement = mainElement.querySelector(`.films-list__container`);
const filmsElement = mainElement.querySelector(`.films`);
new Array(FILM_COUNT)
  .fill(``)
  .forEach(() => render(filmListElement, filmCardTemplate(), `beforeend`));


render(filmsElement, topRatedTemplate(), `beforeend`);
render(filmsElement, mostCommentedTemplate(), `beforeend`);

const topRatedElement = mainElement.querySelector(`#top-rated`);
const topRatedContainerElement = topRatedElement.querySelector(`.films-list__container`);

const mostCommentedElement = mainElement.querySelector(`#most-commented`);
const mostCommentedContainerElement = mostCommentedElement.querySelector(`.films-list__container`);

new Array(EXTRA_FILM_COUNT)
  .fill(``)
  .forEach(() => render(topRatedContainerElement, filmCardTemplate(), `beforeend`));

new Array(EXTRA_FILM_COUNT)
  .fill(``)
  .forEach(() => render(mostCommentedContainerElement, filmCardTemplate(), `beforeend`));
