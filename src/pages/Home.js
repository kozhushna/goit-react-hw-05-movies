import { useEffect, useState } from 'react';
import css from '../components/App/App.module.css';
import MoviesList from 'components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';

import { getTrendingMovies } from '../services/movies-service';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTrendingMovies()
      .then(movies => {
        setTrendingMovies(movies);
      })
      .catch(error => {
        setError("We don't have any casts for this movie");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!trendingMovies.length) return <Loader />;

  return (
    <main>
      <div className={css.container}>
        {isLoading && <Loader />}
        <h1>Trending today</h1>
        <MoviesList movies={trendingMovies} />
      </div>
    </main>
  );
};

export default Home;
