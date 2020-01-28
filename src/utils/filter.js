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
