
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Film, TrendingUp, Star, Menu, X, Sparkles, Bookmark } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Trending', path: '/trending', icon: TrendingUp },
    { name: 'Popular', path: '/popular', icon: Film },
    { name: 'Top Rated', path: '/top-rated', icon: Star },
    { name: 'AI Picks', path: '/ai-picks', icon: Sparkles },
    { name: 'Watchlist', path: '/watchlist', icon: Bookmark },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center neon-border">
              <Film className="text-white" size={24} />
            </div>
            <span className="text-2xl font-outfit font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent neon-text">
              CineSphere
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center gap-1 text-slate-300 hover:text-violet-400 transition-colors font-medium text-sm"
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative group">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all w-48 lg:w-64 group-hover:w-80"
            />
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
          </form>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg py-2 px-10 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            </form>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center gap-3 text-slate-300 hover:text-violet-400 p-2 rounded-md hover:bg-slate-900 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
