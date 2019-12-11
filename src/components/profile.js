import {
  createElement
} from "../util.js";

const headerProfileTemplate = (ratingName) => {
  return (`<section class="header__profile profile">
	<p class="profile__rating">${ratingName}</p>
	<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`);
};

export default class UserProfile {
  constructor(ratingName) {
    this._element = null;
    this._rating = ratingName;
  }

  getTemplate() {
    return headerProfileTemplate(this._rating);
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
