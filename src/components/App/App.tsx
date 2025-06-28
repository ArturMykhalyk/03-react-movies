import { useState } from 'react';
import { fetchMovies } from '../../services/movieServices';
import { Movie } from '../../types/movie';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { SearchBar } from '../SearchBar/SearchBar';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { MovieModal } from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    setMovies([]);

    try {
      setIsLoading(true);
      setIsError(false);

      const movies: Movie[] = await fetchMovies(query);
      if (movies.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(movies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-center" />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
      )}
      {selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </div>
  );
}

export default App;
