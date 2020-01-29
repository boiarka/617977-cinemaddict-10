import {
  FilterType
} from '../util.js';

import {
  getMoviesByFilter,
  getMoviesBySort
} from '../utils/filter.js';

export default class Movies {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL;
    this._activeSortType = `Default`;

    this._sortChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getMovies() {
    const movies = getMoviesByFilter(this._movies, this._activeFilterType);
    return this.getSortedMovies(movies);
  }

  getSortedMovies(movies) {
    return getMoviesBySort(movies, this._activeSortType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setSort(sortType) {
    this._activeSortType = sortType;
    this._sortChangeHandlers.forEach((handler) => handler());
  }

  removeTask(id) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortClickHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }
}
