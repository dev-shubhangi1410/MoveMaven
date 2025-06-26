import React from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import { FeaturedCourses } from '../components/FeaturedCourses';
import { InteractiveBoard } from '../components/InteractiveBoard';
import TrainerBoard from "../components/TrainerBoard";
import Footer from '../components/Footer';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />
      <FeaturedCourses />
      <InteractiveBoard />
      <Footer />
    </div>
  );
}

export default Home;