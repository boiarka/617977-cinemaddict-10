import Film from './movie.js';

const renderFilms = (films, where, onDataChange) => {
  return films.map((film) => {
    const filmController = new Film(where, onDataChange);
    filmController.render(film);

    return filmController;
  });
};


export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];

    this._onDataChange = this._onDataChange.bind(this);
  }
  render(films, countStart, countEnd) {
    this._films = films;

    renderFilms(this._films.slice(countStart, countEnd), this._container, this._onDataChange);
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }
}
