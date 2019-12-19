const FILM_COUNT = 25;
const FILM_COUNT_START = 5;

import FilmSection from './components/film-section.js';
import TopRated from './components/top-rated.js';
import TopCommented from './components/most-commented.js';
import UserProfile from './components/profile.js';
import Navigation from './components/navigation.js';
import Sorting from './components/sort.js';
import LoadMore from './components/load-more.js';
import PageController from './controller/page.js';


import {
  generateFilms
} from './mock/film.js';
import {
  getUserRank
} from './mock/user.js';

import {
  render,
  remove,
  getRandomIntegerNumber,
  RenderPosition
} from "./utils/render.js";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userRankNum = getRandomIntegerNumber(0, 30);
const filmSection = new FilmSection();
render(headerElement, new UserProfile(getUserRank(userRankNum)), RenderPosition.BEFOREEND);
render(mainElement, new Navigation(), RenderPosition.BEFOREEND);
render(mainElement, new Sorting(), RenderPosition.BEFOREEND);
render(mainElement, filmSection, RenderPosition.BEFOREEND);

const allFilms = generateFilms(FILM_COUNT);

const filmsElement = document.querySelector(`.films`);
const filmListElement = document.querySelector(`.films-list`);
const filmListContainerElement = document.querySelector(`.films-list__container`);

let showingFilmsCount = FILM_COUNT_START;

const pageController = new PageController(filmListContainerElement);
pageController.render(allFilms, 0, showingFilmsCount);

const loadMoreButton = new LoadMore();
render(filmListElement, loadMoreButton, RenderPosition.BEFOREEND);

loadMoreButton.setClickHandler(() => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = prevFilmsCount + FILM_COUNT_START;

  pageController.render(allFilms, prevFilmsCount, showingFilmsCount);

  if (showingFilmsCount >= allFilms.length) {
    remove(loadMoreButton);
  }
});

render(filmsElement, new TopRated(), RenderPosition.BEFOREEND);
render(filmsElement, new TopCommented(), RenderPosition.BEFOREEND);


const topRatedElement = mainElement.querySelector(`#top-rated`);
const topRatedContainerElement = topRatedElement.querySelector(`.films-list__container`);
const mostRatedFilmArray = allFilms.sort((a, b) => b.rating - a.rating);
const topRatedController = new PageController(topRatedContainerElement);
topRatedController.render(mostRatedFilmArray, 0, 2);


const mostCommentedElement = mainElement.querySelector(`#most-commented`);
const mostCommentedContainerElement = mostCommentedElement.querySelector(`.films-list__container`);
const mostCommentedFilmArray = allFilms.sort((a, b) => b.comments - a.comments);
const mostCommentedController = new PageController(mostCommentedContainerElement);
mostCommentedController.render(mostCommentedFilmArray, 0, 2);
