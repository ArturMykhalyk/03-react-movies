import { SearchBar } from '../SearchBar/SearchBar';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const handleSubmit = (query: string) => {
    if (query.trim().length === 0) {
      toast.error('Please enter your search query.');
      return;
    }
    console.log(query);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
