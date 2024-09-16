import React from 'react';

function Login() {
  const handleGoogleLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;