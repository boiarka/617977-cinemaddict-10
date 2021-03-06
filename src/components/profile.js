import AbstractComponent from './abstract-component.js';

const headerProfileTemplate = (ratingName) => {
  return (`<section class="header__profile profile">
	<p class="profile__rating">${ratingName}</p>
	<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`);
};

export default class UserProfile extends AbstractComponent {
  constructor(ratingName) {
    super();

    this._rating = ratingName;
  }

  getTemplate() {
    return headerProfileTemplate(this._rating);
  }
}
