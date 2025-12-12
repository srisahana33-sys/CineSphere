
import { Movie } from '../types';

/**
 * CONCEPTUAL DATABASE SCHEMA (SQL):
 * 
 * TABLE users (
 *   id UUID PRIMARY KEY,
 *   email VARCHAR(255) UNIQUE,
 *   ...
 * );
 * 
 * TABLE watchlist (
 *   user_id UUID REFERENCES users(id),
 *   movie_id INTEGER NOT NULL,
 *   title VARCHAR(255),
 *   poster_path TEXT,
 *   release_date DATE,
 *   vote_average FLOAT,
 *   PRIMARY KEY (user_id, movie_id)
 * );
 */

const WATCHLIST_KEY = 'cinesphere_watchlist';

export const watchlistService = {
  getWatchlist: (): Movie[] => {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  },

  addToWatchlist: (movie: Movie): void => {
    const list = watchlistService.getWatchlist();
    if (!list.find(m => m.id === movie.id)) {
      list.unshift(movie);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    }
  },

  removeFromWatchlist: (movieId: number): void => {
    const list = watchlistService.getWatchlist();
    const filtered = list.filter(m => m.id !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
  },

  isInWatchlist: (movieId: number): boolean => {
    const list = watchlistService.getWatchlist();
    return list.some(m => m.id === movieId);
  }
};
