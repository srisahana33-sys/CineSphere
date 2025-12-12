
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Film, ArrowRight } from 'lucide-react';
import { watchlistService } from '../services/watchlistService';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

const Watchlist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(watchlistService.getWatchlist());
  }, []);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-16 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-fuchsia-600 rounded-xl flex items-center justify-center neon-border">
            <Bookmark className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-outfit font-bold text-white">My Watchlist</h1>
            <p className="text-slate-400">Your curated collection of cinematic journeys</p>
          </div>
        </div>
        <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-slate-300 text-sm font-bold">
          {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}
        </span>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-slate-700">
            <Film size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-300">Your watchlist is empty</h2>
            <p className="text-slate-500 max-w-sm">Save movies you want to watch later and they'll show up here.</p>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
          >
            Discover Movies
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
