
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Discover: React.FC = () => {
  const location = useLocation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const titleMap: Record<string, string> = {
    '/trending': 'Trending Now',
    '/popular': 'Popular Releases',
    '/top-rated': 'Top Rated Masterpieces',
    '/ai-picks': 'Gemini AI Curated Picks'
  };

  const title = titleMap[location.pathname] || 'Discover';

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        let res;
        switch(location.pathname) {
          case '/trending': res = await tmdbService.getTrending(page); break;
          case '/popular': res = await tmdbService.getPopular(page); break;
          case '/top-rated': res = await tmdbService.getTopRated(page); break;
          case '/ai-picks': res = await tmdbService.getPopular(page); break; // Fallback for demo
          default: res = await tmdbService.getPopular(page);
        }
        setMovies(prev => page === 1 ? res.results : [...prev, ...res.results]);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [location.pathname, page]);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-16 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-outfit font-extrabold text-white mb-2">{title}</h1>
        <div className="h-1 w-20 bg-violet-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map(movie => (
          <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
        ))}
      </div>

      {isLoading && <div className="mt-10"><LoadingSkeleton /></div>}

      {!isLoading && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="px-10 py-3 bg-slate-900 border border-slate-700 hover:border-violet-500 text-slate-300 rounded-xl font-bold transition-all hover:text-white"
          >
            Load More Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default Discover;
