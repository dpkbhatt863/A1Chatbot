import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import aiAssistantImage from '../assets/ai-assistant.png'; 

const url = process.env.REACT_APP_API_URL

function HomePage({ user }) {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to A1 Chatbot</h1>
            <p>Your intelligent customer support solution powered by Llama and Groq Cloud</p>
          </div>
          <div className="hero-image">
            <img src={aiAssistantImage} alt="AI Assistant" />
          </div>
        </div>
      </header>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Advanced AI Model</h3>
            <p>Powered by the Llama model for state-of-the-art language understanding</p>
          </div>
          <div className="feature-item">
            <h3>Fast Response Time</h3>
            <p>Leveraging Groq Cloud API for quick and efficient processing</p>
          </div>
          <div className="feature-item">
            <h3>Secure Authentication</h3>
            <p>Your data is protected with OAuth 2.0</p>
          </div>
        </div>
      </section>

      
      <section className="cta">
        <h2>Experience AI-powered support now!</h2>
        {user ? (
          <p>Welcome back! Head to your dashboard to continue chatting with our AI.</p>
        ) : (
          <p>Log in to access your personalized dashboard and start chatting with our Llama-powered AI.</p>
        )}
        {!user && <a href={url + "/auth/google"} className="cta-button">Log In with Google</a>}
        {user && <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>}
      </section>


      <section className="about">
        <h2>About Our AI Support Assistant</h2>
        <p>Our AI Support Assistant harnesses the power of the Llama model, a cutting-edge language model known for its impressive natural language understanding capabilities. By integrating with the Groq Cloud API, we ensure fast processing times and efficient handling of your queries. Whether you need help with product information, troubleshooting, or general inquiries, our AI is designed to provide accurate and context-aware responses.</p>
      </section>
    </div>
  );
}

export default HomePage;