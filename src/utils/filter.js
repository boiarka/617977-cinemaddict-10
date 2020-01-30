import moment from "moment";

export const convertReleaseDate = (date) => {
  return moment(date).format(`MM/DD/YYYY`);
};

import {
  FilterType
} from '../util.js';

export const getAllMovies = (movies) => {
  return movies;
};

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.watchList);
};

export const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.alreadyWatched);
};

export const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.favorite);
};


export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return getAllMovies(movies);
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getWatchedMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }
  return movies;
};


export const getMoviesBySort = (movies, sortType) => {
  switch (sortType) {
    case `Rating`:
      return movies.slice().sort((a, b) => b.totalRating - a.totalRating);
    case `Date`:
      return movies.slice().sort((a, b) => Date.parse(b.release.date) - Date.parse(a.release.date));
  }

  return movies;
};
