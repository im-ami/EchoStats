import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { getTopItems, getRecentlyPlayed } from '../lib/spotify';

export function useSpotifyData(timeRange: string) {
  const { token, isTokenValid } = useAuthStore();
  const [data, setData] = useState({
    topArtists: [],
    topTracks: [],
    recentlyPlayed: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isTokenValid()) {
      setError('Session expired. Please login again.');
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [artistsData, tracksData, recentData] = await Promise.all([
          getTopItems(token!, 'artists', timeRange),
          getTopItems(token!, 'tracks', timeRange),
          getRecentlyPlayed(token!)
        ]);

        setData({
          topArtists: artistsData.items,
          topTracks: tracksData.items,
          recentlyPlayed: recentData.items
        });
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token, timeRange, isTokenValid]);

  return { data, isLoading, error };
}