import AbstractComponent from './abstract-component.js';

const mostCommentedTemplate = () => (
  `<section class="films-list--extra" id="most-commented">
	<h2 class="films-list__title">Most commented</h2>
	<div class="films-list__container">
	</div>
</section>`
);

export default class TopCommented extends AbstractComponent {
  getTemplate() {
    return mostCommentedTemplate();
  }
}
