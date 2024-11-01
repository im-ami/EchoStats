import React from 'react';
import { useAuthStore } from './authStore'; // Adjust the path as needed

const Logout = () => {
  const clearToken = useAuthStore((state) => state.clearToken);

  const handleLogout = () => {
    clearToken(); // Clear the token from Zustand
    // Optionally redirect to the login page or do other logout logic
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
