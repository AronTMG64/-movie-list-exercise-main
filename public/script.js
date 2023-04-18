
fetchMovies();

async function fetchMovies() {
  const res = await fetch('/api/movies');
  const data = await res.json();
  render(data);
  createFilter(data);
};


function render(data) {
  const parent = document.querySelector('#parent');

  parent.innerHTML = `
    <table>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Age rating</th>
        <th>Genre</th>
        <th>Rating</th>
      </tr>
      ${data.map(item => `
        <tr class="movies ${item.id}">
          <td>${item.title}</td>
          <td class="text_center">${item.releaseDate.split('-', 1)}</td>
          <td class="text_center">${item.age}</td>
          <td>${item.genres.map(item => ` ${item}`)}</td>
          <td class="text_center">${item.rating * 100} %</td>
        </tr>
      `).join('')}
    </table>
  `;

  const movies = document.querySelectorAll('.movies');
  movies.forEach(movie => {
    movie.addEventListener('click', () => {
      window.location.href = `http://localhost:3000/movie/${movie.classList[1]}`;
    });
  });
};

async function createFilter(movies) {
  const res = await fetch('/api/genres');
  const genres = await res.json();


  const genresCheckboxFilterContainer = document.querySelector ('#genres_checkbox_filter_container');
  genresCheckboxFilterContainer.innerHTML = genres.map(item => `
    <label class="flex">
      <input class="genre_filters" id="genre_${genres.indexOf(item)}" value="${item}" type="checkbox">
      <h3>${item}</h3>
    </label>
  `).join('');
  //genreFilter(movies)
  yearFilter(movies)
};

function yearFilter(movies) {
  const minYearFilter = document.querySelector('#min_year_filter_input');
  const maxYearFilter = document.querySelector('#max_year_filter_input');
  minYearFilter.addEventListener('input', () => {
    const minYear = parseInt(minYearFilter.value);
    const maxYear = parseInt(maxYearFilter.value);
    const filteredMovies = movies.filter(movie => movie.releaseDate.split('-', 1)[0] >= minYear && movie.releaseDate.split('-', 1)[0] <= maxYear);
    render(filteredMovies);
  });

  maxYearFilter.addEventListener('input', () => {
    const minYear = parseInt(minYearFilter.value);
    const maxYear = parseInt(maxYearFilter.value);
    const filteredMovies = movies.filter(movie => movie.releaseDate.split('-', 1)[0] >= minYear && movie.releaseDate.split('-', 1)[0] <= maxYear);
    render(filteredMovies);
  });
};

function genreFilter(movies) {
  const checkboxes = document.querySelectorAll('.genre_filters');
  let selectedValues = [];

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedValues.push(checkbox.value);
      } else {
        selectedValues = selectedValues.filter(value => value !== checkbox.value);
      }
    });
  });

  const filteredMovies = movies.filter(movie => movie.genres.includes(selectedValues));

  render(filteredMovies);
};