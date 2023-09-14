// Basic information about a given track, used in both API and frontend
export type TrackInfoType = {
  company: CompanyDataType;
  song: SongDataType;
};

export type CompanyDataType = {
  name: string;
  logo: string;
  country: string;
  artistsShare: number;
};

export type SongDataType = {
  title: string;
  artist: string;
  album: string;
  duration: number;
  qualityFormat: string;
  qualityKbps: number;
  price: number;
  link: string;
};

export type PlaylistDataType = {
  url: string;
  songs: SongDataType[];
};

// The API returns an array of different tracks per vendor that we later narrow down
export type ApiDataType = {
  itunesData: TrackInfoType[];
  beatportData: TrackInfoType[];
  amazonData: TrackInfoType[];
  bandcampData: TrackInfoType[];
};

// This is the filtered data that we use in the frontend
export type ResultsDataType = {
  itunesData: TrackInfoType;
  beatportData: TrackInfoType;
  amazonData: TrackInfoType;
  bandcampData: TrackInfoType;
};
