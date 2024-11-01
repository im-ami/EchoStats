import React, { useEffect } from 'react';
import { useAuthStore } from './authStore'

const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SCOPES}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenParam = hash.split('&').find((param) => param.startsWith('access_token='));
      if (tokenParam) {
        const token = tokenParam.split('=')[1];
        setToken(token);
      }
      window.location.hash = '';
    }
  }, [setToken]);

  return <button onClick={handleLogin}>Login with Spotify</button>;
};

export default Login;

