import { fetchMovies } from '../../services/movieServices';
import { Movie } from '../../types/movie';
import { SearchBar } from '../SearchBar/SearchBar';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const handleSubmit = async (query: string) => {
    const movies: Movie[] = await fetchMovies(query);
    if (movies.length === 0) {
      toast.error('No movies found for your request.');
      return;
    }
    console.log(movies);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
