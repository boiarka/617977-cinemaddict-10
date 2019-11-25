const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

import {filmSectionTemplate} from './components/film-section.js';
import {topRatedTemplate} from './components/top-rated.js';
import {mostCommentedTemplate} from './components/most-commented.js';
import {filmCardTemplate} from './components/film-card.js';
import {headerProfileTemplate} from './components/profile.js';
import {navTemplate} from './components/navigation.js';
import {sortTemplate} from './components/sort.js';
import {popupTemplate} from './components/popup.js';


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

render(mainElement, popupTemplate(), `beforeend`);
