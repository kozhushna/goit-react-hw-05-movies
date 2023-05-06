import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '64f4e1c154d206124ca10bd40c3205d8';
const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/w200';

export async function getTrendingMovies() {
  const { data } = await axios.get('/trending/all/day', {
    params: {
      api_key: API_KEY,
    },
  });

  return data.results.map(movie => ({ id: movie.id, title: movie.title }));
}

export async function getMovieDetail(id) {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  const {
    original_title,
    genres,
    overview,
    release_date,
    vote_average,
    belongs_to_collection,
  } = data;
  return {
    title: original_title,
    genres: genres.map(ganre => ganre.name),
    overview,
    year: release_date.substring(0, 4),
    score: Math.round(vote_average * 10),
    imageUrl: `${IMAGES_BASE_URL}${belongs_to_collection.poster_path}`,
  };
}
