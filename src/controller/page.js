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
    this._onSortChange = this._onSortChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setSortClickHandler(this._onSortChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

    this._showingMoviesCount = FILM_COUNT_START;
    this._loadMoreButtonComponent = new LoadMoreComponent();
    this._filmContainerComponent = new FilmContainerComponent();

    this._moviesListElement = null;
    this._activeSortType = null;
  }
  render() {
    const container = this._container.getElement();
    this._movies = this._moviesModel.getMoviesAll();

    render(container, this._filmContainerComponent, RenderPosition.BEFOREEND);
    this._moviesListElement = this._filmContainerComponent.getElement().querySelector(`.films-list__container`);

    if (this._movies.length === 0) {
      const noFilmsComponent = new NoFilmsComponent();
      render(this._moviesListElement, noFilmsComponent, RenderPosition.BEFOREEND);
    } else {

      this._renderMovies(this._movies.slice(0, this._showingMoviesCount));
      this._renderLoadMoreButton();
    }
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const newMovies = renderFilms(this._moviesListElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    console.log(this._showedMovieControllers);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._moviesModel.getMovies().length > FILM_COUNT_START) {
      this._loadMoreButtonComponent = new LoadMoreComponent();
      const container = this._container.getElement().querySelector(`.films-list`);
      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevMoviesCount = this._showingMoviesCount;
        this._showingMoviesCount = this._showingMoviesCount + FILM_COUNT_START;

        this._renderMovies(this._moviesModel.getMovies().slice(prevMoviesCount, this._showingMoviesCount));

        if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    }

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

  _onSortChange() {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, FILM_COUNT_START));
    this._renderLoadMoreButton();
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((movies) => movies.setDefaultView());
  }

}
