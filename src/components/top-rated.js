import {
  createElement
} from "../util.js";

const topRatedTemplate = () => (
  `<section class="films-list--extra" id="top-rated">
	<h2 class="films-list__title">Top rated</h2>
	<div class="films-list__container">
	</div>
</section>`
);


export default class TopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return topRatedTemplate();
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
