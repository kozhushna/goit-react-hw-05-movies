import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetails from 'pages/MovieDetails';
import Header from 'components/Header/Header';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';

export const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Header />}>
    //     <Route index element={<Home />} />
    //     <Route path="/movies" element={<Movies />} />
    //     <Route path="/movies/:movieId" element={<MovieDetails />}>
    //       <Route path="cast" element={<Cast />} />
    //       <Route path="reviews" element={<Reviews />} />
    //     </Route>
    //   </Route>
    // </Routes>

    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
