import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from '../components/App/App.module.css';
import MoviesList from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';
import Loader from 'components/Loader/Loader';

import { getSearchMovies } from '../services/movies-service';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;
    setIsLoading(true);
    getSearchMovies(query)
      .then(movies => {
        setSearchMovies(movies);
      })
      .catch(error => {
        setError("We don't have any results");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  const onSubmit = query => {
    setSearchParams({ query });
  };

  if (error) return <div>{error}</div>;

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <SearchForm onSubmit={onSubmit} />
      <MoviesList movies={searchMovies} />
    </div>
  );
};

export default Movies;
