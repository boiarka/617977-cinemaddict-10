const FILM_COUNT = 25;
const FILM_COUNT_START = 5;

import FilmSection from './components/film-section.js';
import TopRated from './components/top-rated.js';
import TopCommented from './components/most-commented.js';
import FilmCard from './components/film-card.js';
import UserProfile from './components/profile.js';
import Navigation from './components/navigation.js';
import Sorting from './components/sort.js';
import Popup from './components/popup.js';
import {
  generateFilms
} from './mock/film.js';
import {
  getUserRank
} from './mock/user.js';

import {
  render,
  RenderPosition
} from "./util.js";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};
const userRankNum = getRandomIntegerNumber(0, 30);

render(headerElement, new UserProfile(getUserRank(userRankNum)).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Navigation().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Sorting().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmSection().getElement(), RenderPosition.BEFOREEND);

const filmListElement = mainElement.querySelector(`.films-list__container`);
const filmsElement = mainElement.querySelector(`.films`);
const allFilms = generateFilms(FILM_COUNT);


const renderFilm = (film, where) => {
  const filmElement = new FilmCard(film);
  const popupElement = new Popup(film);

  const filmPoster = filmElement.getElement().querySelector(`.film-card__poster`);
  const filmName = filmElement.getElement().querySelector(`.film-card__title`);
  const filmComments = filmElement.getElement().querySelector(`.film-card__comments`);
  filmPoster.addEventListener(`click`, () => {
    render(document.body, popupElement.getElement(), RenderPosition.BEFOREEND);
  });
  filmName.addEventListener(`click`, () => {
    render(document.body, popupElement.getElement(), RenderPosition.BEFOREEND);
  });
  filmComments.addEventListener(`click`, () => {
    render(document.body, popupElement.getElement(), RenderPosition.BEFOREEND);
  });

  const closePopup = popupElement.getElement().querySelector(`.film-details__close-btn`);
  closePopup.addEventListener(`click`, () => {
    popupElement.getElement().remove();
  });

  render(where, filmElement.getElement(), RenderPosition.BEFOREEND);
};

let showingFilmsCount = FILM_COUNT_START;
allFilms.slice(0, showingFilmsCount).forEach((item) => {
  renderFilm(item, filmListElement);
});

const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = prevFilmsCount + FILM_COUNT_START;

  allFilms.slice(prevFilmsCount, showingFilmsCount)
    .forEach((item) => renderFilm(item, filmListElement));

  if (showingFilmsCount >= allFilms.length) {
    loadMoreButton.remove();
  }
});


render(filmsElement, new TopRated().getElement(), RenderPosition.BEFOREEND);
render(filmsElement, new TopCommented().getElement(), RenderPosition.BEFOREEND);

const topRatedElement = mainElement.querySelector(`#top-rated`);
const topRatedContainerElement = topRatedElement.querySelector(`.films-list__container`);
const mostRatedFilmArray = allFilms.sort((a, b) => b.rating - a.rating);
mostRatedFilmArray.slice(0, 2).forEach((item) => {
  renderFilm(item, topRatedContainerElement);
});

const mostCommentedElement = mainElement.querySelector(`#most-commented`);
const mostCommentedContainerElement = mostCommentedElement.querySelector(`.films-list__container`);
const mostCommentedFilmArray = allFilms.sort((a, b) => b.comments - a.comments);
mostCommentedFilmArray.slice(0, 2).forEach((item) => {
  renderFilm(item, mostCommentedContainerElement);
});
