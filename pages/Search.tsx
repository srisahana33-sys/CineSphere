
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const res = await tmdbService.searchMovies(query);
        setMovies(res.results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearch();
  }, [query]);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-16 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
          <SearchIcon className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-outfit font-bold text-white">Search Results</h1>
          <p className="text-slate-400">Found results for: <span className="text-violet-400 font-bold">"{query}"</span></p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="text-slate-700">
            <SearchIcon size={80} />
          </div>
          <h2 className="text-2xl font-bold text-slate-300">No movies found</h2>
          <p className="text-slate-500 max-w-md">We couldn't find anything matching your search. Try different keywords or check out our trending section.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
