import AbstractComponent from './abstract-component.js';

const filmContainerTemplate = () => (
  `<div class="films-list__container"></div>`
);

export default class FilmContainer extends AbstractComponent {
  getTemplate() {
    return filmContainerTemplate();
  }
}
