import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetail } from '../services/movies-service';

import css from '../components/App/App.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetail(movieId).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { title, genres, overview, year, score, imageUrl } = movie;
  console.log(movie);

  return (
    <div className={css.container}>
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
