import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCredits } from 'services/movies-service';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    getCredits(movieId)
      .then(data => {
        setCast(data);
      })
      .catch(error => {
        setError("We don't have any casts for this movie");
      });
  }, [movieId]);

  if (error) return <div>{error}</div>;
  if (!cast.length) return <div>Loading...</div>;

  return (
    <ul>
      {cast.map(({ name, character, imageUrl, id }) => (
        <li key={id}>
          <img src={imageUrl} alt={name} width={100} />
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
