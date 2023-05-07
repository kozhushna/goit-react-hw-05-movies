import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { getCredits } from 'services/movies-service';

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
        setError("We don't have any casts for this movie");
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
      <ul>
        {cast.map(({ name, character, imageUrl, id }) => (
          <li key={id}>
            <img src={imageUrl} alt={name} width={100} />
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
