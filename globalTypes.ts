// What we request from our API
export type RequestDataType = {
  country: string;
  searchQuery: {
    artist: string;
    title: string;
    duration: number;
  };
};

// What our API returns
export type ResponseDataType = {
  itunesData: VendorDataType;
  beatportData: VendorDataType;
  amazonData: VendorDataType;
  bandcampData: VendorDataType;
};

export type VendorDataType = {
  vendor: {
    name: string;
    country: string;
  };
  songs: TrackDataType[];
};

export type TrackDataType = {
  title: string;
  artist: string;
  album: string;
  duration: number;
  qualityFormat: string;
  qualityKbps: number;
  price: number | undefined;
  songLink: string;
  artLink: string;
};

// What the itunes API returns
export type ITunesData = {
  resultCount: number;
  results: ITunesResults[];
};

export type ITunesResults = {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  isStreamable: boolean;
  collectionArtistName?: string;
};
