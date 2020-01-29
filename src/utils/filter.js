import {
  FilterType
} from '../util.js';

export const getAllMovies = (movies) => {
  return movies;
};

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isWatchlist);
};

export const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

export const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
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
      return movies.slice().sort((a, b) => b.rating - a.rating);
    case `Date`:
      return movies.slice().sort((a, b) => Date.parse(b.year) - Date.parse(a.year));
  }

  return movies;
};
