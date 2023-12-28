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

export type SpotifyData = {
  profileData: ProfileData | null;
  currentlyPlaying: CurrentlyPlaying | null;
  queue: Queue | null;
  recentlyPlayed: RecentlyPlayed | null;
  topArtists: TopArtists | null;
  topTracks: TopTracks | null;
};

// Meta
export type ProfileData = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: Followers;
  country: string;
  product: string;
  explicit_content: ExplicitContent;
  email: string;
};
export type CurrentlyPlaying = {
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Track;
  currently_playing_type: string;
  actions: Actions;
  is_playing: boolean;
};
export type Queue = {
  currently_playing: Track;
  queue: Track[];
};

export type RecentlyPlayed = {
  items: RecentlyPlayedTrack[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
};

export type TopArtists = {
  items: TopArtist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: string;
  next: string;
};

export type TopTracks = {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: string;
  next: string;
};

// Combined
export type RecentlyPlayedTrack = {
  track: Track;
  played_at: string;
  context: Context;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
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

export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type TopArtist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Context = {
  external_urls: ExternalUrls;
  href: string;
  type: string;
  uri: string;
};

export type Actions = {
  disallows: Disallows;
};

export type Cursors = {
  after: string;
  before: string;
};

// Singles
export type Image = {
  height: number;
  url: string;
  width: number;
};
export type ExternalIds = {
  isrc: string;
};
export type Disallows = {
  resuming: boolean;
};
export type ExternalUrls = {
  spotify: string;
};

export type Followers = {
  href: any;
  total: number;
};

export type ExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};
