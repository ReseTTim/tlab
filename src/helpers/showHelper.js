export const highestRatingFirst = (showA, showB) => {
  const ratingA = showA.rating?.average || 0;
  const ratingB = showB.rating?.average || 0;

  return ratingB - ratingA;
}
