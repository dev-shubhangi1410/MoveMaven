import React from 'react';
import { Crown, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-blue-400" />
            <Link to="/" className="text-2xl font-bold text-white">
              MoveMaven
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-gray-300 hover:text-blue-400 transition-colors">Courses</Link>
            <a href="/trainer" className="text-gray-300 hover:text-blue-400 transition-colors">Practice</a>
            {/* <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About</a> */}
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              Get Started
            </button>
          </nav>
          
          <button className="md:hidden p-2">
            <Menu className="h-6 w-6 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;