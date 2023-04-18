const movieId = window.location.pathname.split('/').splice(-1)[0];

fetchMovies();

async function fetchMovies() {
  try {
    const res = await fetch('/api/movies/' + movieId);
    const movie = await res.json();
    
    console.log(movie);

    document.querySelector('#parent').innerHTML = `
      <div class="movie_container flex">
        <img class="movie_poster" src="/images/${movie.image}">
        <div class="movie_info_container flex column">
          <h1>${movie.title}</h1>
          <h3 class="word_break">${movie.description}</h3>
          <h3>${movie.genres.join(', ')}</h3>
          <h3>Release date: ${movie.releaseDate}</h3>
          <h3>Length: ${countSecondsToHoursAndMinutes(movie.length)}</h3>
          <h3>Age rating: ${movie.age}</h3>
          <h3>Rating: ${movie.rating * 100} %</h3>
        </div>
      </div>
    `;
  } catch (error) {
    document.write(`movie with id ${movieId} not found`);
  };
};

function countSecondsToHoursAndMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours} h ${minutes - 60 * hours} min`;
};