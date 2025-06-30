// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import SymptomChecker from './pages/SymptomChecker/SymptonChecker';
import Recommendations from './components/Recommendations/Recommendations';
import Community from './pages/Community/Community';
import About from './pages/About/About';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>⚕ Carewise AI</h1>
          <p>Revolutionizing Healthcare with Artificial Intelligence</p>
        </header>
        
        <nav className="sidebar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/symptom-checker">AI Symptom Checker</Link></li>
            <li><Link to="/recommendations">Personalized Recommendations</Link></li>
            <li><Link to="/community">Blogs and Community Support</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© 2025 Carewise AI | All Rights Reserved</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;