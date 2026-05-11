export const highestRatingFirst = (showA, showB) => {
  const ratingA = showA.rating?.average || 0;
  const ratingB = showB.rating?.average || 0;

  return ratingB - ratingA;
}

export const alphabetical = (showA, showB) => {
  return showA.name.localeCompare(showB.name)
}

export const SORTERS = {
  alphabetical,
  highestRating: highestRatingFirst,
  none: null,
}

export const sortShows = (shows, sortBy = 'none') => {
  const sorter = SORTERS[sortBy];

  if (!sorter) {
    return shows;
  }

  // clone the show to not update the original object
  return [...shows].sort(sorter);
}