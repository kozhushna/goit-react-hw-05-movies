import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from '../components/App/App.module.css';

import { getTrendingMovies } from '../services/movies-service';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    getTrendingMovies().then(movies => {
      setTrendingMovies(movies);
    });
  }, []);

  const location = useLocation();

  return (
    <div className={css.container}>
      <ul>
        {trendingMovies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
