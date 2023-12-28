export type SongTableTab = 'recentlyPlayed' | 'queue' | 'mostPlayed';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type PriceData = {
  artist: string;
  song: string;
  prices: { amazon: number; itunes: number; beatport: number; bandcamp: number };
};

// << Spotify >>
export type SpotifyData = {
  profileData: SpotifyProfileData | null;
  currentlyPlaying: SpotifyCurrentlyPlaying | null;
  queue: SpotifyQueue | null;
  recentlyPlayed: SpotifyRecentlyPlayed | null;
  topArtists: SpotifyTopArtists | null;
  topTracks: SpotifyTopTracks | null;
};

// Meta
export type SpotifyProfileData = {
  display_name: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  type: string;
  uri: string;
  followers: SpotifyFollowers;
  country: string;
  product: string;
  explicit_content: SpotifyExplicitContent;
  email: string;
};
export type SpotifyCurrentlyPlaying = {
  timestamp: number;
  context: SpotifyContext;
  progress_ms: number;
  item: SpotifyTrack;
  currently_playing_type: string;
  actions: SpotifyActions;
  is_playing: boolean;
};
export type SpotifyQueue = {
  currently_playing: SpotifyTrack;
  queue: SpotifyTrack[];
};

export type SpotifyRecentlyPlayed = {
  items: SpotifyRecentlyPlayedTrack[];
  next: string;
  cursors: SpotifyCursors;
  limit: number;
  href: string;
};

export type SpotifyTopArtists = {
  items: SpotifyTopArtist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: string;
  next: string;
};

export type SpotifyTopTracks = {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: string;
  next: string;
};

// Combined
export type SpotifyRecentlyPlayedTrack = {
  track: SpotifyTrack;
  played_at: string;
  context: SpotifyContext;
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type SpotifyArtist = {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyTopArtist = {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type SpotifyContext = {
  external_urls: SpotifyExternalUrls;
  href: string;
  type: string;
  uri: string;
};

export type SpotifyActions = {
  disallows: SpotifyDisallows;
};

export type SpotifyCursors = {
  after: string;
  before: string;
};

// Singles
export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};
export type SpotifyExternalIds = {
  isrc: string;
};
export type SpotifyDisallows = {
  resuming: boolean;
};
export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyFollowers = {
  href: any;
  total: number;
};

export type SpotifyExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};
