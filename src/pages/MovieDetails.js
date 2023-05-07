import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getMovieDetail } from '../services/movies-service';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import Loader from 'components/Loader/Loader';

import css from '../components/App/App.module.css';
import detailCss from '../pages/MovieDetails.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { movieId } = useParams();
  const location = useLocation();
  const goBackUrl = useRef(location?.state?.from ?? { pathname: '/' });
  useEffect(() => {
    setIsLoading(true);
    getMovieDetail(movieId)
      .then(data => {
        setMovie(data);
      })
      .catch(error => {
        setError('Page not found');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  if (error) {
    return (
      <div className={css.container}>
        <div>{error}</div>
      </div>
    );
  }
  if (!movie) return <Loader />;

  const { title, genres, overview, year, score, imageUrl } = movie;

  return (
    <main>
      <div className={css.container}>
        {isLoading && <Loader />}
        <GoBackButton path={goBackUrl.current}>Go back</GoBackButton>
        <div className={detailCss.movieWrapper}>
          <img src={imageUrl} alt={title} width={200} />
          <div className={detailCss.movieContent}>
            <h2>
              {title} ({year})
            </h2>
            <p>User Score: {score}%</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <p>{genres.join(' ')}</p>
            <p>Additional information</p>
          </div>
        </div>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </main>
  );
};

export default MovieDetails;
