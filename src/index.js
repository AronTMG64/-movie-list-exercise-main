const express = require('express');
const path = require('path');
const movies = require('./data/movies.json');
const ageRatings = require('./data/age-ratings.json');
const genres = require('./data/genres.json');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join('public')));

app.get('/movie/:id', (req, res) => {
  res.status(200).sendFile(path.resolve('public/movies.html'));
});

app.get('/api/movies', (req, res) => {
  res.status(200).json(movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    age: movie.age,
    genres: movie.genres,
    releaseDate: movie.releaseDate,
    rating: movie.rating
  })));
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(item => item.id == req.params.id);
  res.status(200).json(movie);
});

app.get('/api/genres', (req, res) => {
  res.status(200).json(genres);
});

app.get('/api/age-ratings', (req, res) => {
  res.status(200).json(ageRatings);
});

app.listen(port, (error) => {
  if(error) {
    console.log(error);
    return;
  }
  console.log(`Server is running at http://localhost:${port}`);
});
