const getUserRank = (num) => {
  let rank = ``;
  if (num >= 1 && num <= 10) {
    rank = `novice`;
  } else if (num >= 11 && num <= 20) {
    rank = `fan`;
  } else if (num >= 21) {
    rank = `movie buff`;
  }
  return rank;
};

export {
  getUserRank
};
