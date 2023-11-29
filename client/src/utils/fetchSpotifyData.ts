/* 
User's info: user-read-email + user-read-private (https://api.spotify.com/v1/me)
User's currently playing: user-read-currently-playing (https://api.spotify.com/v1/me/player/currently-playing)
User's queue: user-read-currently-playing + user-read-playback-state (https://api.spotify.com/v1/me/player)
User's recently played: user-read-recently-played (https://api.spotify.com/v1/me/player/recently-played)
User's top artists: user-top-read (https://api.spotify.com/v1/me/top/artists)
*/

const USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
const CURRENTLY_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const QUEUE_ENDPOINT = 'https://api.spotify.com/v1/me/player';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';

export const fetchProfileData = async (token: string) => {
  const data = fetchSpotifyData(token, USER_PROFILE_ENDPOINT);
  return data;
};

export const fetchCurrentlyPlaying = async (token: string) => {
  const data = fetchSpotifyData(token, CURRENTLY_PLAYING_ENDPOINT);
  return data;
};

export const fetchQueue = async (token: string) => {
  const data = fetchSpotifyData(token, QUEUE_ENDPOINT);
  return data;
};

export const fetchRecentlyPlayed = async (token: string) => {
  const data = fetchSpotifyData(token, RECENTLY_PLAYED_ENDPOINT);
  return data;
};

export const fetchTopArtists = async (token: string) => {
  const data = fetchSpotifyData(token, TOP_ARTISTS_ENDPOINT);
  return data;
};

const fetchSpotifyData = async (token: string, endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

// const combinedFetchSpotifyData = async (token: string) => {
//   const [recentlyPlayed, topArtists] = await Promise.all([fetchRecentlyPlayed(token), fetchTopArtists(token)]);
//   return { recentlyPlayed, topArtists };
// };
