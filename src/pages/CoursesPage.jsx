import React from 'react';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
// Top of CoursesPage.jsx
import courses from '../data/courses.json';


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
