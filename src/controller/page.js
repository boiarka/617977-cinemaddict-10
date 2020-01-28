import LoadMoreComponent from '../components/load-more.js';
import FilmContainerComponent from '../components/films-container.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmController from './movie.js';


import {
  render,
  remove,
  RenderPosition
} from '../utils/render.js';

const FILM_COUNT_START = 5;

const renderFilms = (filmListElement, movies, onDataChange, onViewChange) => {
  return movies.map((task) => {
    const filmController = new FilmController(filmListElement, onDataChange, onViewChange);
    filmController.render(task);

    return filmController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._movies = [];
    this._showedMovieControllers = [];
    this._onDataChange = this._onDataChange.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

    this._showingMoviesCount = FILM_COUNT_START;
    this._loadMoreButtonComponent = new LoadMoreComponent();
    this._filmContainerComponent = new FilmContainerComponent();

    this._moviesListElement = null;
  }
  render() {
    const container = this._container.getElement();
    this._movies = this._moviesModel.getMoviesAll();

    render(container, this._filmContainerComponent, RenderPosition.BEFOREEND);
    this._moviesListElement = this._filmContainerComponent.getElement();

    if (this._movies.length === 0) {
      const noFilmsComponent = new NoFilmsComponent();
      render(this._moviesListElement, noFilmsComponent, RenderPosition.BEFOREEND);
    } else {
      const newMovies = renderFilms(this._moviesListElement, this._movies.slice(0, this._showingMoviesCount), this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      this._renderLoadMoreButton();
    }
  }

  _removeMovies() {
    this._moviesListElement = this._filmContainerComponent.getElement();

    this._moviesListElement.innerHTML = ``;
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const newTasks = renderFilms(this._moviesListElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newTasks);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _renderLoadMoreButton() {
    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingMoviesCount;
      const movies = this._moviesModel.getMovies();

      this._showingMoviesCount = this._showingMoviesCount + FILM_COUNT_START;

      const newTasks = renderFilms(this._moviesListElement, movies.slice(prevTasksCount, this._showingMoviesCount), this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newTasks);

      if (this._showingMoviesCount >= movies.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onFilterChange() {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, FILM_COUNT_START));
    this._renderLoadMoreButton();
  }
}
