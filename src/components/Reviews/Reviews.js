import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviews } from 'services/movies-service';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    getReviews(movieId)
      .then(data => {
        setReviews(data);
      })
      .catch(error => {
        setError("We don't have any reviews for this movie");
      });
  }, [movieId]);

  if (error) return <div>{error}</div>;
  if (!reviews.length) return <div>Loading...</div>;

  return (
    <ul>
      {reviews.map(({ author, content, id }) => (
        <li key={id}>
          <h3>{author}</h3>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
