export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type FormDataType = {
  country: string;
  searchMode: string;
  songSearchQuery: {
    artist: string;
    title: string;
    duration: number;
  };
  playlistSearchString: string;
};

// Basic information about a given track, used in both API and frontend
export type TrackInfoType = {
  vendor: {
    name: string;
    country: string;
    songLink: string;
    artLink: string;
  };
  song: {
    title: string;
    artist: string;
    album: string;
    duration: number;
    qualityFormat: string;
    qualityKbps: number;
    price: number;
  };
};

export type PlaylistDataType = {
  url: string;
  songs: TrackInfoType[];
};

// The front-end makes 4 calls to the API, 1 per vendor. We then combine the returned data into one new type
export type ApiResponseDataType = {
  itunesData: TrackInfoType[];
  beatportData: TrackInfoType[];
  amazonData: TrackInfoType[];
  bandcampData: TrackInfoType[];
};

export type ApiSongRequestDataType = {
  artist: string;
  title: string;
  country: string;
};

// This is the filtered data that we use in the frontend
export type ResultsDataType = {
  itunesData: TrackInfoType;
  beatportData: TrackInfoType;
  amazonData: TrackInfoType;
  bandcampData: TrackInfoType;
};
