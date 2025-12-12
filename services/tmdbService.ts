
import { Movie, MovieDetails, Genre } from '../types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// NOTE: For this demo, we'll use a public-access-style approach or assume TMDB key handling.
// In a real app, this would be an environment variable.
const TMDB_API_KEY = '3f14f419d013f6465fe206d196f3f4d6'; // Standard demo key for TMDB testing

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'en-US',
    ...params,
  });
  
  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid TMDB API Key. Please provide a valid key in tmdbService.ts");
      }
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error: any) {
    if (error.name === 'TypeError') {
      throw new Error("Network error. Please check your internet connection.");
    }
    throw error;
  }
}

export const tmdbService = {
  getTrending: (page = 1) => 
    fetchTMDB<{ results: Movie[] }>('/trending/movie/day', { page: page.toString() }),
  
  getPopular: (page = 1) => 
    fetchTMDB<{ results: Movie[] }>('/movie/popular', { page: page.toString() }),
  
  getTopRated: (page = 1) => 
    fetchTMDB<{ results: Movie[] }>('/movie/top_rated', { page: page.toString() }),
  
  getMovieDetails: (id: string) => 
    fetchTMDB<MovieDetails>(`/movie/${id}`, { append_to_response: 'credits' }),
  
  getSimilarMovies: (id: string) => 
    fetchTMDB<{ results: Movie[] }>(`/movie/${id}/similar`),
  
  searchMovies: (query: string, page = 1) => 
    fetchTMDB<{ results: Movie[] }>('/search/movie', { query, page: page.toString() }),
  
  getGenres: () => 
    fetchTMDB<{ genres: Genre[] }>('/genre/movie/list'),
  
  getMoviesByGenre: (genreId: string, page = 1) => 
    fetchTMDB<{ results: Movie[] }>('/discover/movie', { 
      with_genres: genreId, 
      page: page.toString(),
      sort_by: 'popularity.desc'
    }),
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => 
  path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?auto=format&fit=crop&q=80&w=1000';
