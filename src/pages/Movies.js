import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from '../components/App/App.module.css';
import MoviesList from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';

import { getSearchMovies } from '../services/movies-service';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;
    getSearchMovies(query)
      .then(movies => {
        setSearchMovies(movies);
      })
      .catch(error => {
        setError("We don't have any results");
      });
  }, [searchParams]);

  const onSubmit = query => {
    setSearchParams({ query });
  };

  if (error) return <div>{error}</div>;

  return (
    <div className={css.container}>
      <SearchForm onSubmit={onSubmit} />
      <MoviesList movies={searchMovies} />
    </div>
  );
};

export default Movies;
