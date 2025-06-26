import React from 'react';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';

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
  },
  {
    title: "Queen's Gambit",
    description: "Control the center and develop pieces quickly with this classic and aggressive 1.d4 opening.",
    difficulty: "Intermediate",
    duration: "2.5 hours",
    rating: 4.7,
    image: "♕"
  },
  {
    title: "French Defense",
    description: "Solid and strategic response to 1.e4. Learn how to build strong pawn structures and counterplay.",
    difficulty: "Intermediate",
    duration: "3 hours",
    rating: 4.6,
    image: "♖"
  },
  {
    title: "London System",
    description: "A reliable and easy-to-learn system for White that avoids heavy opening theory.",
    difficulty: "Beginner",
    duration: "1.5 hours",
    rating: 4.5,
    image: "♙"
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-[#112244] text-white">
      <Header />

      <section className="relative text-center pt-20 pb-24 px-6 overflow-hidden bg-[#0A0F1C] border-b border-gray-800">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/chessboard-faint.png')] bg-contain bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/images/chess-hero-pattern.png')] bg-cover bg-center"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500 opacity-10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
            Choose Your Opening Repertoire
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Start learning chess openings with structured lessons, guided practice, and instant feedback.
          </p>
        </div>
      </section>

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

      <Footer/>
    </div>
  );
}
