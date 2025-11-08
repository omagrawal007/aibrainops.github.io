import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            AI Agency
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-slate-900 dark:text-slate-50' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors ${
                isActive('/blog') 
                  ? 'text-slate-900 dark:text-slate-50' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-slate-900 dark:text-slate-50' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/blog') 
                    ? 'text-slate-900 dark:text-slate-50' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
