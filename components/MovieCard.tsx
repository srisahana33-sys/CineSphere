
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdbService';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative bg-slate-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-violet-600 p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play fill="white" size={24} />
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
            {new Date(movie.release_date).getFullYear() || 'TBA'}
          </span>
          <div className="flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-500">
            <Star size={10} fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <h3 className="text-slate-200 font-bold text-sm line-clamp-1 group-hover:text-violet-400 transition-colors">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
