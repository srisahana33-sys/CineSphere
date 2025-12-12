
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Discover from './pages/Discover';
import Watchlist from './pages/Watchlist';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trending" element={<Discover />} />
            <Route path="/popular" element={<Discover />} />
            <Route path="/top-rated" element={<Discover />} />
            <Route path="/ai-picks" element={<Discover />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-950 border-t border-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-xl font-outfit font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  CineSphere
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Experience the future of movie discovery. Powered by cutting-edge AI and the world's most comprehensive movie database.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="/" className="hover:text-violet-400 transition-colors">Home</a></li>
                <li><a href="#/trending" className="hover:text-violet-400 transition-colors">Trending</a></li>
                <li><a href="#/popular" className="hover:text-violet-400 transition-colors">Popular</a></li>
                <li><a href="#/watchlist" className="hover:text-violet-400 transition-colors font-bold text-fuchsia-400">Watchlist</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">TMDB API</a></li>
                <li><a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">Gemini AI</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Stay Connected</h4>
              <p className="text-slate-500 text-sm mb-4">Join our newsletter for the latest cinematic releases.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-violet-500" />
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">Join</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
            © {new Date().getFullYear()} CineSphere AI. All cinematic rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
