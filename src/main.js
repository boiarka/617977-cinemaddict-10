import API from './api.js';

import FilmSection from './components/film-section.js';
// import TopRated from './components/top-rated.js';
// import TopCommented from './components/most-commented.js';
// import UserProfile from './components/profile.js';

import PageController from './controller/page.js';
import FilterController from './controller/filter.js';
import SortController from './controller/sort.js';

import MoviesModel from './models/movies.js';


import {
  render,
  RenderPosition
} from "./utils/render.js";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// const userRankNum = getRandomIntegerNumber(0, 30);
// render(headerElement, new UserProfile(getUserRank(userRankNum)), RenderPosition.BEFOREEND);


const filterController = new FilterController(mainElement, moviesModel);


const sortController = new SortController(mainElement, moviesModel);


const filmSectionComponent = new FilmSection();



api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);

    filterController.render();
    sortController.render();
    render(mainElement, filmSectionComponent, RenderPosition.BEFOREEND);

    const pageController = new PageController(filmSectionComponent, moviesModel);
    pageController.render();
  });

// const filmsElement = document.querySelector(`.films`);
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
