import FilterComponent from '../components/filter.js';
import {
  FilterType
} from '../util.js';
import {
  render,
  replace,
  RenderPosition
} from '../utils/render.js';
import {
  getMoviesByFilter
} from '../utils/filter.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const allMovies = this._moviesModel.getMovies();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }

  }

  _onFilterChange(filterType, currentFilter) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this._changeActiveFilter(currentFilter);
  }

  _changeActiveFilter(newActiveFilter) {
    const oldActiveFilter = this._filterComponent.getElement().querySelector(`.main-navigation__item--active`);
    oldActiveFilter.classList.remove(`main-navigation__item--active`);
    newActiveFilter.classList.add(`main-navigation__item--active`);
  }
}
