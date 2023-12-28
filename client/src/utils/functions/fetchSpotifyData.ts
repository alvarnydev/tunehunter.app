/* 
User's info: user-read-email + user-read-private (https://api.spotify.com/v1/me)
User's currently playing: user-read-currently-playing (https://api.spotify.com/v1/me/player/currently-playing)
User's queue: user-read-currently-playing + user-read-playback-state (https://api.spotify.com/v1/me/player/queue)
User's recently played: user-read-recently-played (https://api.spotify.com/v1/me/player/recently-played)
User's top artists: user-top-read (https://api.spotify.com/v1/me/top/artists)
*/

import { SpotifyCurrentlyPlaying, SpotifyProfileData, SpotifyQueue, SpotifyRecentlyPlayed, SpotifyTopArtists, SpotifyTopTracks } from '@/types';

const USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
const CURRENTLY_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const QUEUE_ENDPOINT = 'https://api.spotify.com/v1/me/player/queue';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50';

export const combinedFetchSpotifyData = async (token: string) => {
  const [profileData, currentlyPlaying, queue, recentlyPlayed, topArtists, topTracks] = await Promise.all([
    fetchProfileData(token),
    fetchCurrentlyPlaying(token),
    fetchQueue(token),
    fetchRecentlyPlayed(token),
    fetchTopArtists(token),
    fetchTopTracks(token),
  ]);
  return { profileData, currentlyPlaying, queue, recentlyPlayed, topArtists, topTracks };
};

export const fetchProfileData = async (token: string) => {
  const data = fetchSpotifyData(token, USER_PROFILE_ENDPOINT) as Promise<SpotifyProfileData>;
  return data;
};

export const fetchCurrentlyPlaying = async (token: string) => {
  const data = fetchSpotifyData(token, CURRENTLY_PLAYING_ENDPOINT) as Promise<SpotifyCurrentlyPlaying>;
  return data;
};

export const fetchQueue = async (token: string) => {
  const data = fetchSpotifyData(token, QUEUE_ENDPOINT) as Promise<SpotifyQueue>;
  return data;
};

export const fetchRecentlyPlayed = async (token: string) => {
  const data = fetchSpotifyData(token, RECENTLY_PLAYED_ENDPOINT) as Promise<SpotifyRecentlyPlayed>;
  return data;
};

export const fetchTopArtists = async (token: string) => {
  const data = fetchSpotifyData(token, TOP_ARTISTS_ENDPOINT) as Promise<SpotifyTopArtists>;
  return data;
};

export const fetchTopTracks = async (token: string) => {
  const data = fetchSpotifyData(token, TOP_TRACKS_ENDPOINT) as Promise<SpotifyTopTracks>;
  return data;
};

const fetchSpotifyData = async (token: string, endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204 || response.status >= 400) {
    return null;
  }
  return await response.json();
};
