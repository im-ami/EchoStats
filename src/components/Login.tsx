import React from 'react';
import { Music } from 'lucide-react';
import { loginUrl } from '../lib/spotify';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Music className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-4xl font-bold text-white">
            Spotify Analytics Dashboard
          </h2>
          <p className="mt-2 text-gray-400">
            Discover insights about your music taste
          </p>
        </div>
        <a
          href={loginUrl}
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-500 hover:bg-green-400 md:py-4 md:text-lg md:px-10 transition-colors"
        >
          Login with Spotify
        </a>
      </div>
    </div>
  );
}