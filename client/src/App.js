import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Chatbot from './components/Chatbot';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/current_user', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUser(data);
        }
      })
      .catch(error => console.log('Error fetching user:', error));
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:3001/api/logout', {
      credentials: 'include',
    })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(error => console.log('Error during logout:', error));
  };

  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/">Home</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <a href="http://localhost:3001/auth/google">Login with Google</a>
          )}
        </nav>
      </header>
      <div className="layout">
          <main className="chat-area">
            <Routes>
              <Route path="/" element={<HomePage user={user} />} /> {/* Pass user to HomePage */}
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider> {/* Wrap your application with AuthProvider */}
      <Router>
        <div className="App">
          <main>
            <AppContent /> {/* Ensure AppContent is rendered here */}
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;