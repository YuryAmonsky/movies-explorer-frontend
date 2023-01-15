export const filterMovies = (movies, req, onlyShortFilms, userId) => {
  return movies.filter((movie) => {
    let filter = true;
    if (req !== null) {
      const regex = new RegExp(req, 'i');
      const textFilterResult = movie.nameRU.match(regex);
      filter &&= !!textFilterResult;
    }
    if (onlyShortFilms !== null) {
      if (onlyShortFilms) {
        filter &&= movie.duration <= 40;
      }
    }
    if (userId !== null) {
      filter &&= movie.owner === userId;
    }
    return filter;
  });
}