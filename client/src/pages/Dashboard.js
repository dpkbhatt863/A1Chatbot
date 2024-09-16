import React from 'react';
import Chatbot from '../components/Chatbot';
import '../styles/Dashboard.css';
import aiBotImage from '../assets/ai-assistant.png'; 
function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="user-info">
          <h2>Profile</h2>
          {user?.photo && <img src={user.photo} alt="Profile" className="profile-pic" />}
          <h3>{user?.displayName || 'Guest'}</h3>
          <p>Email: {user?.email || 'Not available'}</p>
        </div>
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <h2>Chat with Me</h2>
              <p>Ask me anything !</p>
            </div>
            <img src={aiBotImage} alt="AI Bot" className="ai-bot-image" />
          </div>
          <div className="chatbot-wrapper">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
