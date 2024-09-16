import React from 'react';

const url = process.env.REACT_APP_API_URL

function LandingPage() {
  const handleGoogleLogin = () => {
    window.open(url + '/auth/google', '_self');
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