const { useParams } = require('react-router-dom');

const Reviews = () => {
  const { movieId } = useParams();

  // useEffect(() => {
  // HTTP запрос, если нужно
  // }, [])

  return <div>SubBreeds: {movieId}</div>;
};

export default Reviews;
