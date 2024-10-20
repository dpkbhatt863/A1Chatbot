import React from 'react';

function Login() {
  const handleGoogleLogin = () => {
    window.open("https://a1chatbotbackend.onrender.com" + '/auth/google', '_self');
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
