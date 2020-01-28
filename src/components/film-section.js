import AbstractComponent from './abstract-component.js';

const filmSectionTemplate = () => (
  `<section class="films"></section>`
);

export default class FilmSection extends AbstractComponent {
  getTemplate() {
    return filmSectionTemplate();
  }
}
