const FILM_COUNT = 25;
const FILM_COUNT_START = 5;
const EXTRA_FILM_COUNT = 2;

import {filmSectionTemplate} from './components/film-section.js';
import {topRatedTemplate} from './components/top-rated.js';
import {mostCommentedTemplate} from './components/most-commented.js';
import {filmCardTemplate} from './components/film-card.js';
import {headerProfileTemplate} from './components/profile.js';
import {navTemplate} from './components/navigation.js';
import {sortTemplate} from './components/sort.js';
import {popupTemplate} from './components/popup.js';
import {generateFilm, generateFilms} from './mock/film.js';
import {getUserRank} from './mock/user.js';
import {generatePopupInfo} from './mock/popup.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};
const userRankNum = getRandomIntegerNumber(0, 30);

render(headerElement, headerProfileTemplate(getUserRank(userRankNum)), `beforeend`);
render(mainElement, navTemplate(), `beforeend`);
render(mainElement, sortTemplate(), `beforeend`);
render(mainElement, filmSectionTemplate(), `beforeend`);

const filmListElement = mainElement.querySelector(`.films-list__container`);
const filmsElement = mainElement.querySelector(`.films`);
const allFilms = generateFilms(FILM_COUNT);

console.log(allFilms);

let showingFilmsCount = FILM_COUNT_START;
allFilms.slice(0, showingFilmsCount).forEach((item) => {
  render(filmListElement, filmCardTemplate(item), `beforeend`);
});

const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = prevFilmsCount + FILM_COUNT_START;

  allFilms.slice(prevFilmsCount, showingFilmsCount)
    .forEach((item) => render(filmListElement, filmCardTemplate(item), `beforeend`));

  if (showingFilmsCount >= allFilms.length) {
    loadMoreButton.remove();
  }
});


render(filmsElement, topRatedTemplate(), `beforeend`);
render(filmsElement, mostCommentedTemplate(), `beforeend`);

const topRatedElement = mainElement.querySelector(`#top-rated`);
const topRatedContainerElement = topRatedElement.querySelector(`.films-list__container`);
const mostRatedFilmArray = allFilms.sort((a, b) => b.rating - a.rating);
mostRatedFilmArray.slice(0, 2).forEach((item) => {
  render(topRatedContainerElement, filmCardTemplate(item), `beforeend`);
});

const mostCommentedElement = mainElement.querySelector(`#most-commented`);
const mostCommentedContainerElement = mostCommentedElement.querySelector(`.films-list__container`);
const mostCommentedFilmArray = allFilms.sort((a, b) => b.comments - a.comments);
mostCommentedFilmArray.slice(0, 2).forEach((item) => {
  render(mostCommentedContainerElement, filmCardTemplate(item), `beforeend`);
});


const popupInfo = generatePopupInfo();
render(mainElement, popupTemplate(popupInfo), `beforeend`);
