import React from 'react';

const url = "https://a1chatbotbackend.onrender.com"

function Login() {
  const handleGoogleLogin = () => {
    window.open(url + '/auth/google', '_self');
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
