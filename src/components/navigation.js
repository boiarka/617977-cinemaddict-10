import {
  createElement
} from "../util.js";

const navTemplate = () => (
  `<nav class="main-navigation">
	<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
	<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
	<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
	<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
	<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
</nav>`
);

export default class Navigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return navTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
