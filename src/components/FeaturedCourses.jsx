import React from 'react';
import CourseCard from './CourseCard';

//convert this line to jsx code

export const FeaturedCourses = () => {
  const courses = [
    {
      title: "Italian Game",
      description: "Master this classical opening that leads to exciting tactical battles. Perfect for beginners learning opening principles.",
      difficulty: "Beginner",
      duration: "2 hours",
      rating: 4.8,
      image: "♔"
    },
    {
      title: "Sicilian Defense",
      description: "Explore the most popular defense against 1.e4. Learn key variations and strategic concepts used by grandmasters.",
      difficulty: "Intermediate",
      duration: "3 hours",
      rating: 4.9,
      image: "♛"
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Opening Courses
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Start with these popular openings and build a solid foundation for your chess game
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};