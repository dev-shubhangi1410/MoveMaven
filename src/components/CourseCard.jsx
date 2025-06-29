import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Star } from 'lucide-react';

const CourseCard = ({
  id, // <-- added
  title,
  description,
  difficulty,
  duration,
  rating,
  image
}) => {
  return (
    <Link to={`/trainer/${id}`}>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative flex items-center justify-center group-hover:from-blue-900/50 group-hover:to-gray-800 transition-all duration-300">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{image}</div>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
              difficulty === 'Beginner' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
            }`}>
              {difficulty}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Start Learning</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
