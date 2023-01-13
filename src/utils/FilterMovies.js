export const filterMovies = (req, movies, onlyShortFilms, userId) => {
  return movies.filter((movie) => {
    const regex = new RegExp(req, 'i');
    const res = movie.nameRU.match(regex);
    if(userId){      
      if(onlyShortFilms){

        return  !!res && movie.owner===userId && movie.duration <= 40;
      }
      return !!res && movie.owner===userId;
    }else{
      if(onlyShortFilms){

        return  !!res && movie.duration <= 40;
      }
      return !!res;
    }    
  });
}