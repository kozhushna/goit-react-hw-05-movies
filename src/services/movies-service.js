import axios from 'axios';
import profileIcon from '../images/profile-icon.png';

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
    poster_path,
  } = data;
  return {
    title: original_title,
    genres: genres.map(ganre => ganre.name),
    overview,
    year: release_date.substring(0, 4),
    score: Math.round(vote_average * 10),
    imageUrl: `${IMAGES_BASE_URL}${poster_path}`,
  };
}

export async function getCredits(id) {
  const { data } = await axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  return data.cast.map(({ name, character, profile_path, credit_id }) => ({
    name,
    character,
    imageUrl: profile_path ? `${IMAGES_BASE_URL}${profile_path}` : profileIcon,
    id: credit_id,
  }));
}
