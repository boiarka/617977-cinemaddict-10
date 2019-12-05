const MAX_DESCRIPTION_COUNT = 3;

const filmNames = [
  `Побег из Шоушенка`,
  `Крёстный отец`,
  `Тёмный рыцарь`,
  `Список Шиндлера`,
  `Криминальное чтиво`,
  `Властелин колец: Возвращение короля`,
  `Бойцовский клуб`,
  `Начало`,
  `Властелин колец: Две крепости`,
  `Славные парни`,
  `Жизнь прекрасна`,
  `Спасти рядового Райана`,
  `Однажды на Диком Западе`,
  `Терминатор 2: Судный день`,
  `Великий диктатор`
];

const posterImageNames = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const filmDescriptions = [
  `1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `2 Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `3 Fusce tristique felis at fermentum pharetra.  `,
  `4 Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `5 Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `6 Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  `7 Aliquam id orci ut lectus varius viverra.`,
  `8 Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `9 Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`
];

const filmGenre = [
  `Action`,
  `Adventure`,
  `Comedie`,
  `Crime`,
  `Horror`,
  `Western`
];

const filmDuration = [
  `10m`,
  `1h 20m`,
  `50m`,
  `2h 10m`,
  `45m`,
  `3h`
]

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomRatingNumber = (min, max) => {
  let num = min + (max * Math.random());
  return num.toFixed(1);
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomDescriptionArray = (array) => {
  let newDescription = ``;
  for (let i = 0; i < MAX_DESCRIPTION_COUNT; i++) {
    const randomIndex = getRandomIntegerNumber(0, array.length);
    newDescription += array[randomIndex];
  }
  return newDescription;
};


const generateFilm = () => {
  return {
    name: getRandomArrayItem(filmNames),
    image: getRandomArrayItem(posterImageNames),
    description: getRandomDescriptionArray(filmDescriptions),
    comments: getRandomIntegerNumber(0, 20),
    genre: getRandomArrayItem(filmGenre),
    rating: getRandomRatingNumber(0, 10),
    year: getRandomDate(new Date(1960, 0, 1), new Date()).getFullYear(),
    duration: getRandomArrayItem(filmDuration)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {
  generateFilm,
  generateFilms
};


