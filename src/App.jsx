import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TrainerPage from "./pages/TrainerPage";
import CoursesPage from "./pages/CoursesPage"; // <-- Add this import

function App() {
  return (
    <Router basename="/MoveMaven/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainer/:id" element={<TrainerPage />} />
        <Route path="/courses" element={<CoursesPage />} /> {/* <-- Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
