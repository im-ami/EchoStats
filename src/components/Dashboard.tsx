import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Music, User, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getTopItems, getRecentlyPlayed } from '../lib/spotify';

export default function Dashboard() {
  const { token } = useAuthStore();
  const [timeRange, setTimeRange] = useState('short_term');
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, timeRange]);

  async function fetchData() {
    const [artistsData, tracksData, recentData] = await Promise.all([
      getTopItems(token!, 'artists', timeRange),
      getTopItems(token!, 'tracks', timeRange),
      getRecentlyPlayed(token!),
    ]);

    setTopArtists(artistsData.items);
    setTopTracks(tracksData.items);
    setRecentlyPlayed(recentData.items);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Your Music Analytics</h1>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setTimeRange('short_term')}
            className={`px-4 py-2 rounded-full ${
              timeRange === 'short_term'
                ? 'bg-green-500 text-black'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => setTimeRange('medium_term')}
            className={`px-4 py-2 rounded-full ${
              timeRange === 'medium_term'
                ? 'bg-green-500 text-black'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => setTimeRange('long_term')}
            className={`px-4 py-2 rounded-full ${
              timeRange === 'long_term'
                ? 'bg-green-500 text-black'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            All Time
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-green-500" />
            <h2 className="text-xl font-semibold">Top Artists</h2>
          </div>
          <div className="space-y-4">
            {topArtists.slice(0, 5).map((artist: any) => (
              <div
                key={artist.id}
                className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg"
              >
                <img
                  src={artist.images[2]?.url}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{artist.name}</p>
                  <p className="text-sm text-gray-400">
                    {artist.genres.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Music className="text-green-500" />
            <h2 className="text-xl font-semibold">Top Tracks</h2>
          </div>
          <div className="space-y-4">
            {topTracks.slice(0, 5).map((track: any) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg"
              >
                <img
                  src={track.album.images[2]?.url}
                  alt={track.name}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium">{track.name}</p>
                  <p className="text-sm text-gray-400">
                    {track.artists.map((a: any) => a.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-800 rounded-xl p-6 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-green-500" />
            <h2 className="text-xl font-semibold">Listening Activity</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recentlyPlayed.map((item: any) => ({
                  name: new Date(item.played_at).toLocaleDateString(),
                  plays: 1,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="plays" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}