import { useEffect, useState } from 'react';
import css from '../components/App/App.module.css';
import MoviesList from 'components/MoviesList/MoviesList';

import { getTrendingMovies } from '../services/movies-service';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    getTrendingMovies().then(movies => {
      setTrendingMovies(movies);
    });
  }, []);

  return (
    <div className={css.container}>
      <MoviesList movies={trendingMovies} />
    </div>
  );
};

export default Home;
