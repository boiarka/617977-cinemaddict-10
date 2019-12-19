import AbstractComponent from './abstract-component.js';

const loadMoreSectionTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return loadMoreSectionTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
