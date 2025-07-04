import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import { useEffect } from 'react';
import { Movie } from '../../types/movie';

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export function MovieModal({ onClose, movie }: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const {
    title,
    backdrop_path,
    overview,
    release_date,
    vote_average,
    poster_path,
  } = movie;
  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
              : `https://image.tmdb.org/t/p/original/${poster_path}`
          }
          alt={title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong>
            {release_date}
          </p>
          <p>
            <strong>Rating:</strong>
            {vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
