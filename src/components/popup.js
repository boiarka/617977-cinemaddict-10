import AbstractSmartComponent from './abstract-smart-component.js';

const popupTemplate = (popup) => {
  const {
    image,
    name,
    originalName,
    rating,
    userRate,
    producer,
    screenwriters,
    cast,
    dateAndYear,
    duration,
    country,
    genre,
    description,
    ageRating,
    comments,
    isWatchlist,
    isWatched,
    isFavorite
  } = popup;

  return (`<section class="film-details">
	<form class="film-details__inner" action="" method="get">
		<div class="form-details__top-container">
			<div class="film-details__close">
				<button class="film-details__close-btn" type="button">close</button>
			</div>
			<div class="film-details__info-wrap">
				<div class="film-details__poster">
					<img class="film-details__poster-img" src="./images/posters/${image}" alt="">

					<p class="film-details__age">${ageRating}</p>
				</div>

				<div class="film-details__info">
					<div class="film-details__info-head">
						<div class="film-details__title-wrap">
							<h3 class="film-details__title">${name}</h3>
							<p class="film-details__title-original">${originalName}</p>
						</div>

						<div class="film-details__rating">
							<p class="film-details__total-rating">${rating}</p>
							${isWatched ? `<p class="film-details__user-rating">${userRate}</p>` : ``}
						</div>
					</div>

					<table class="film-details__table">
						<tr class="film-details__row">
							<td class="film-details__term">Director</td>
							<td class="film-details__cell">${producer}</td>
						</tr>
						<tr class="film-details__row">
							<td class="film-details__term">Writers</td>
							<td class="film-details__cell">${screenwriters}</td>
						</tr>
						<tr class="film-details__row">
							<td class="film-details__term">Actors</td>
							<td class="film-details__cell">${cast}</td>
						</tr>
						<tr class="film-details__row">
							<td class="film-details__term">Release Date</td>
							<td class="film-details__cell">${dateAndYear}</td>
						</tr>
						<tr class="film-details__row">
							<td class="film-details__term">Runtime</td>
							<td class="film-details__cell">${duration}</td>
						</tr>
						<tr class="film-details__row">
							<td class="film-details__term">Country</td>
							<td class="film-details__cell">${country}</td>
						</tr>
						<tr class="film-details__row">
							<td class="film-details__term">Genres</td>
							<td class="film-details__cell">
								<span class="film-details__genre">${genre}</span>
								</td>
						</tr>
					</table>

					<p class="film-details__film-description">${description}</p>
				</div>
			</div>

			<section class="film-details__controls">
				<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist"
					name="watchlist" ${isWatchlist ? `checked` : ``}>
				<label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to
					watchlist</label>

				<input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
				<label for="watched" class="film-details__control-label film-details__control-label--watched">Already
					watched</label>

				<input type="checkbox" class="film-details__control-input visually-hidden" id="favorite"
					name="favorite" ${isFavorite ? `checked` : ``}>
				<label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to
					favorites</label>
			</section>
		</div>
${isWatched ? `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/${image}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${name}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked="">
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </div>` : ``}
		<div class="form-details__bottom-container">
			<section class="film-details__comments-wrap">
				<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span>
				</h3>

				<ul class="film-details__comments-list">
					<li class="film-details__comment">
						<span class="film-details__comment-emoji">
							<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
						</span>
						<div>
							<p class="film-details__comment-text">Interesting setting and a good cast</p>
							<p class="film-details__comment-info">
								<span class="film-details__comment-author">Tim Macoveev</span>
								<span class="film-details__comment-day">2019/12/31 23:59</span>
								<button class="film-details__comment-delete">Delete</button>
							</p>
						</div>
					</li>
					<li class="film-details__comment">
						<span class="film-details__comment-emoji">
							<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
						</span>
						<div>
							<p class="film-details__comment-text">Booooooooooring</p>
							<p class="film-details__comment-info">
								<span class="film-details__comment-author">John Doe</span>
								<span class="film-details__comment-day">2 days ago</span>
								<button class="film-details__comment-delete">Delete</button>
							</p>
						</div>
					</li>
					<li class="film-details__comment">
						<span class="film-details__comment-emoji">
							<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
						</span>
						<div>
							<p class="film-details__comment-text">Very very old. Meh</p>
							<p class="film-details__comment-info">
								<span class="film-details__comment-author">John Doe</span>
								<span class="film-details__comment-day">2 days ago</span>
								<button class="film-details__comment-delete">Delete</button>
							</p>
						</div>
					</li>
					<li class="film-details__comment">
						<span class="film-details__comment-emoji">
							<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
						</span>
						<div>
							<p class="film-details__comment-text">Almost two hours? Seriously?</p>
							<p class="film-details__comment-info">
								<span class="film-details__comment-author">John Doe</span>
								<span class="film-details__comment-day">Today</span>
								<button class="film-details__comment-delete">Delete</button>
							</p>
						</div>
					</li>
				</ul>

				<div class="film-details__new-comment">
					<div for="add-emoji" class="film-details__add-emoji-label"></div>

					<label class="film-details__comment-label">
						<textarea class="film-details__comment-input"
							placeholder="Select reaction below and write comment here" name="comment"></textarea>
					</label>

					<div class="film-details__emoji-list">
						<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
							id="emoji-smile" value="sleeping">
						<label class="film-details__emoji-label" for="emoji-smile">
							<img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
						</label>

						<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
							id="emoji-sleeping" value="neutral-face">
						<label class="film-details__emoji-label" for="emoji-sleeping">
							<img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
						</label>

						<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
							id="emoji-gpuke" value="grinning">
						<label class="film-details__emoji-label" for="emoji-gpuke">
							<img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
						</label>

						<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
							id="emoji-angry" value="grinning">
						<label class="film-details__emoji-label" for="emoji-angry">
							<img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
						</label>
					</div>
				</div>
			</section>
		</div>
	</form>
</section>`);
};


export default class Popup extends AbstractSmartComponent {
  constructor(popup) {
    super();

    this._popup = popup;
    this._isWatchlist = popup.isWatchlist;
    this._isWatched = popup.isWatched;
    this._isFavorite = popup.isFavorite;

    this._subscribeOnEvents();
    this._setRating();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this._setRating();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return popupTemplate(this._popup);
  }

  _setRating() {
    if (this._isWatched) {
      const ratingBlock = this.getElement().querySelector(`.film-details__user-rating-score`);
      ratingBlock.addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          this._popup.userRate = evt.target.value;
          this.rerender();
        }
      });
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      element.remove();
    });

    element.querySelector(`#watchlist`).addEventListener(`click`, () => {
      this._isWatchlist = !this._isWatchlist;
      this._popup.isWatchlist = this._isWatchlist;
      this.rerender();
    });

    element.querySelector(`#watched`).addEventListener(`click`, () => {
      this._isWatched = !this._isWatched;
      this._popup.isWatched = this._isWatched;
      this.rerender();
    });

    element.querySelector(`#favorite`).addEventListener(`click`, () => {
      this._isFavorite = !this._isFavorite;
      this._popup.isFavorite = this._isFavorite;
      this.rerender();
    });
  }
}
