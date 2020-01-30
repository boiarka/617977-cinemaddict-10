import AbstractComponent from './abstract-component.js';

const FILTER_ID_PREFIX = `filter__`;

const FilterNames = {
  all: `All movies`,
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`,
};

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter) => {
  const {
    name,
    count,
    checked
  } = filter;

  return (
    `<a href="#" id="filter__${name}" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">
				${(name !== `All movies`) ? `<span class="main-navigation__item-count">${count}</span>` : ``}  ${FilterNames[filter.name]} </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
						${filtersMarkup}
						<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    const filtersName = this.getElement().querySelectorAll(`.main-navigation__item`);
    filtersName.forEach((filter) => {
      filter.addEventListener(`click`, (evt) => {
        const filterName = getFilterNameById(evt.target.id);
        handler(filterName, filter);
      });
    });
  }
}
