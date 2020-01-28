const FILM_COUNT = 25;
const FILM_COUNT_START = 5;

import FilmSection from './components/film-section.js';
import TopRated from './components/top-rated.js';
import TopCommented from './components/most-commented.js';
import UserProfile from './components/profile.js';
import Sorting from './components/sort.js';
import LoadMore from './components/load-more.js';

import PageController from './controller/page.js';
import FilterController from './controller/filter.js';

import MoviesModel from './models/movies.js';

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
render(headerElement, new UserProfile(getUserRank(userRankNum)), RenderPosition.BEFOREEND);

const allFilms = generateFilms(FILM_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(allFilms);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

render(mainElement, new Sorting(), RenderPosition.BEFOREEND);


const filmSectionComponent = new FilmSection();
render(mainElement, filmSectionComponent, RenderPosition.BEFOREEND);


const pageController = new PageController(filmSectionComponent, moviesModel);
pageController.render();


// render(filmsElement, new TopRated(), RenderPosition.BEFOREEND);
// render(filmsElement, new TopCommented(), RenderPosition.BEFOREEND);


// const topRatedElement = mainElement.querySelector(`#top-rated`);
// const topRatedContainerElement = topRatedElement.querySelector(`.films-list__container`);
// const mostRatedFilmArray = allFilms.sort((a, b) => b.rating - a.rating);
// moviesModel.setMovies(mostRatedFilmArray);
// const topRatedController = new PageController(topRatedContainerElement, moviesModel);
// topRatedController.render(0, 2);


// const mostCommentedElement = mainElement.querySelector(`#most-commented`);
// const mostCommentedContainerElement = mostCommentedElement.querySelector(`.films-list__container`);
// const mostCommentedFilmArray = allFilms.sort((a, b) => b.comments - a.comments);
// moviesModel.setMovies(mostCommentedFilmArray);
// const mostCommentedController = new PageController(mostCommentedContainerElement, moviesModel);
// mostCommentedController.render(0, 2);
