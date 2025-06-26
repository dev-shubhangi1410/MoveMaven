import React from 'react';
import { Crown, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">MoveMaven</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Master chess openings with interactive lessons and practice. 
              Sign up later to track your progress.
            </p>
            <div className="flex gap-4">
              <Github className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Mail className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Learn</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Beginner Course</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Opening Database</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Practice Mode</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Analysis Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 MoveMaven. All rights reserved. Built with passion for chess education.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;