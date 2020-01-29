import AbstractComponent from './abstract-component.js';

const sortTemplate = () => (
  `<ul class="sort">
	<li><a href="#" class="sort__button sort__button--active" data-sort="Default">Sort by default</a></li>
	<li><a href="#" class="sort__button" data-sort="Date">Sort by date</a></li>
	<li><a href="#" class="sort__button" data-sort="Rating">Sort by rating</a></li>
</ul>`
);


export default class Sorting extends AbstractComponent {
  getTemplate() {
    return sortTemplate();
  }

  setSortClickHandler(handler) {
    const sortType = this.getElement().querySelectorAll(`.sort__button`);
    let activeSortType = `Default`;
    sortType.forEach((item) => {
      item.addEventListener(`click`, () => {
        const itemData = item.dataset.sort;
        console.log(itemData);
        if (activeSortType !== itemData) {
          activeSortType = itemData;
          handler(itemData, item);
        }
      });
    });
  }
}
