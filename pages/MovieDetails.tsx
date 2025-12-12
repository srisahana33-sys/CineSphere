
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService, getImageUrl } from '../services/tmdbService';
import { geminiService } from '../services/geminiService';
import { watchlistService } from '../services/watchlistService';
import { MovieDetails as MovieDetailsType, Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Star, Clock, Calendar, Play, Sparkles, Users, Bookmark, BookmarkCheck } from 'lucide-react';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const [details, similarRes] = await Promise.all([
          tmdbService.getMovieDetails(id),
          tmdbService.getSimilarMovies(id),
        ]);
        setMovie(details);
        setSimilar(similarRes.results.slice(0, 6));
        setIsSaved(watchlistService.isInWatchlist(details.id));

        // Get AI Insight from Gemini
        const insight = await geminiService.getAiRecommendationInsight(details.title, details.overview);
        setAiInsight(insight);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleToggleWatchlist = () => {
    if (!movie) return;
    if (isSaved) {
      watchlistService.removeFromWatchlist(movie.id);
      setIsSaved(false);
    } else {
      watchlistService.addToWatchlist(movie);
      setIsSaved(true);
    }
  };

  if (isLoading) return (
    <div className="pt-24 px-6 max-w-7xl mx-auto flex items-center justify-center h-[80vh]">
      <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!movie) return <div className="pt-24 text-center">Movie not found.</div>;

  return (
    <div className="pb-16">
      {/* Backdrop Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(movie.backdrop_path, 'original')} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-64 relative z-10">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10">
          {/* Poster & Basic Info */}
          <div className="space-y-6">
            <img 
              src={getImageUrl(movie.poster_path, 'w500')} 
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl border border-slate-800"
            />
            
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Rating</span>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star size={18} fill="currentColor" />
                  {movie.vote_average.toFixed(1)}/10
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Runtime</span>
                <div className="flex items-center gap-1 text-slate-200">
                  <Clock size={18} />
                  {movie.runtime} min
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Release</span>
                <div className="flex items-center gap-1 text-slate-200">
                  <Calendar size={18} />
                  {new Date(movie.release_date).toLocaleDateString()}
                </div>
              </div>
            </div>

            <button 
              onClick={handleToggleWatchlist}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
                isSaved 
                ? 'bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/40 hover:bg-fuchsia-600/30' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              {isSaved ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          {/* Detailed Description */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-outfit font-extrabold text-white">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl text-violet-400 font-medium italic">
                  "{movie.tagline}"
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Insight Box */}
            <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-violet-500/10 transform rotate-12 transition-transform group-hover:scale-110">
                <Sparkles size={120} />
              </div>
              <div className="flex items-center gap-2 text-violet-400 font-bold mb-3">
                <Sparkles size={18} />
                <span>AI EXPLORER INSIGHT</span>
              </div>
              <p className="text-lg text-slate-200 leading-relaxed relative z-10">
                {aiInsight || "Analyzing cinematic patterns..."}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-outfit font-bold text-white flex items-center gap-2">
                Synopsis
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Cast Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-outfit font-bold text-white flex items-center gap-2">
                <Users size={24} className="text-violet-500" />
                Principal Cast
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {movie.credits?.cast.slice(0, 10).map(member => (
                  <div key={member.id} className="flex-shrink-0 w-24 text-center space-y-2">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-800">
                      <img 
                        src={member.profile_path ? getImageUrl(member.profile_path) : 'https://via.placeholder.com/100x100?text=Actor'} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold text-white truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-20 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-600/20 rounded-lg">
              <Sparkles className="text-violet-500" />
            </div>
            <h2 className="text-2xl font-outfit font-bold text-white">More Like This</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similar.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
