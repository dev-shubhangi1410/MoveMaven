import React from 'react';
import { Crown, Play } from 'lucide-react';
import { Link } from "react-router-dom";
import courses from "../data/courses.json";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Crown className="h-16 w-16 text-blue-400 drop-shadow-lg" />
              <div className="absolute inset-0 h-16 w-16 text-blue-400 animate-pulse opacity-50">
                <Crown className="h-16 w-16" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master Chess Openings
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 block">
              the Smart Way
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Practice, memorize, and explore openings like a pro — Jump in instantly. Sign up later to track your progress.
          </p>
          <Link to={`/trainer/${courses[0].id}`}>
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-8 py-4 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 flex items-center mx-auto gap-3 group">
              <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
              Practice Now
            </button>
          </Link>
        </div>
      </div>
      
      {/* Animated chess pattern decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-4 -left-4 grid grid-cols-8 gap-0 transform rotate-12 scale-150 animate-pulse">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 ${
                (Math.floor(i / 8) + i) % 2 === 0 ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
    </section>
  );
};