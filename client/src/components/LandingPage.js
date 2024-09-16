import React from 'react';

function LandingPage() {
  const handleGoogleLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the Chatbot</h1>
      <p>Please log in or register to continue.</p>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <p>Or</p>
      <button onClick={() => alert('Registration functionality coming soon!')}>Register</button>
    </div>
  );
}

export default LandingPage;