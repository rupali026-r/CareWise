import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Carewise AI</h1>
        <p>Your AI-powered healthcare companion</p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>🤖 AI Symptom Checker</h3>
          <p>Get instant analysis of your symptoms with our advanced AI</p>
        </div>
        
        <div className="feature-card">
          <h3>💊 Personalized Recommendations</h3>
          <p>Receive tailored health recommendations based on your profile</p>
        </div>
        
        <div className="feature-card">
          <h3>👥 Community Support</h3>
          <p>Connect with others and share health experiences</p>
        </div>
        
        <div className="feature-card">
          <h3>📚 Health Resources</h3>
          <p>Access comprehensive health information and guides</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
