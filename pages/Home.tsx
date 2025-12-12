
import React, { useEffect, useState } from 'react';
import { tmdbService, getImageUrl } from '../services/tmdbService';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Play, Info, TrendingUp, Sparkles, Star, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          tmdbService.getTrending(),
          tmdbService.getPopular(),
          tmdbService.getTopRated(),
        ]);
        
        if (trendingRes.results.length === 0) {
          throw new Error("No trending movies found.");
        }

        setTrending(trendingRes.results.slice(0, 10));
        setPopular(popularRes.results);
        setTopRated(topRatedRes.results);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An unexpected error occurred while fetching movies.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <div className="h-64 bg-slate-900 animate-pulse rounded-3xl mb-12" />
      <LoadingSkeleton />
    </div>
  );

  if (error || trending.length === 0) return (
    <div className="pt-32 px-6 flex flex-col items-center justify-center text-center min-h-[60vh] space-y-4">
      <AlertCircle className="text-red-500 w-16 h-16" />
      <h2 className="text-2xl font-bold text-white">Ops! Something went wrong</h2>
      <p className="text-slate-400 max-w-md">
        {error || "We couldn't load the movie data. This is likely due to an invalid TMDB API key or network issues."}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold transition-all"
      >
        Try Again
      </button>
    </div>
  );

  const heroMovie = trending[0];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(heroMovie.backdrop_path, 'original')} 
            alt={heroMovie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1920';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-violet-600/20 text-violet-400 border border-violet-500/30 rounded-full w-fit text-xs font-bold uppercase tracking-widest animate-bounce">
              <Sparkles size={14} />
              AI Recommendation
            </div>
            <h1 className="text-5xl md:text-7xl font-outfit font-extrabold text-white leading-tight">
              {heroMovie.title}
            </h1>
            <p className="text-lg text-slate-300 line-clamp-3 leading-relaxed">
              {heroMovie.overview}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link to={`/movie/${heroMovie.id}`} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 neon-border">
                <Play fill="white" size={20} />
                Watch Now
              </Link>
              <Link to={`/movie/${heroMovie.id}`} className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold backdrop-blur-md transition-all">
                <Info size={20} />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 space-y-16 relative z-10">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-600/20 rounded-lg">
                <TrendingUp className="text-violet-500" />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-white">Trending Movies</h2>
            </div>
            <Link to="/trending" className="text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trending.slice(1).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Popular Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-fuchsia-600/20 rounded-lg">
                <Play className="text-fuchsia-500" size={20} />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-white">Popular Releases</h2>
            </div>
            <Link to="/popular" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium text-sm transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {popular.slice(0, 12).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Top Rated Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Star className="text-yellow-500" size={20} />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-white">Top Rated Classics</h2>
            </div>
            <Link to="/top-rated" className="text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {topRated.slice(0, 12).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
