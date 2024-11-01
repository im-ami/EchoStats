const CLIENT_ID = 'a220f74bac3848578470109ac69a6fc0';
const REDIRECT_URI = window.location.hostname === 'localhost' 
  ? 'http://localhost:5173/callback'
  : `${window.location.origin}/callback`;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-library-read',
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

export async function getUserProfile(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function getTopItems(token: string, type: 'artists' | 'tracks', timeRange: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?limit=50&time_range=${timeRange}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
}

export async function getRecentlyPlayed(token: string) {
  const response = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=50',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
}