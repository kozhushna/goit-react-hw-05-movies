import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetail } from '../services/movies-service';
import GoBackButton from 'components/GoBackButton/GoBackButton';

import css from '../components/App/App.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackUrl = location?.state?.from || '/';
  useEffect(() => {
    getMovieDetail(movieId).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { title, genres, overview, year, score, imageUrl } = movie;

  return (
    <div className={css.container}>
      <GoBackButton path={goBackUrl}>Back to movies</GoBackButton>
      <img src={imageUrl} alt={title} width={200} />
      <h2>
        {title} ({year})
      </h2>
      <p>User Score: {score}%</p>
      <h3>Overview</h3>
      <p>{overview}</p>
      <h3>Genres</h3>
      <p>{genres.join(' ')}</p>
      <p>Additional information</p>
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
  );
};

export default MovieDetails;
