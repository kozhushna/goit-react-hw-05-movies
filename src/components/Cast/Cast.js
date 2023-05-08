import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { getCredits } from 'services/movies-service';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getCredits(movieId)
      .then(data => {
        setCast(data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  if (error) return <div>{error}</div>;
  if (!cast.length) return <Loader />;

  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.castList}>
        {cast.map(({ name, character, imageUrl, id }) => (
          <li key={id} className={css.castItem}>
            <img src={imageUrl} alt={name} width={100} />
            <div className={css.castInfoWrapper}>
              <p className={css.castInfo}>{name}</p>
              <p>Character: {character}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
