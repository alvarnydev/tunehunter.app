// What we request from the API
export type RequestDataType = {
  country: string;
  searchQuery: {
    artist: string;
    title: string;
    duration: number;
  };
};

// What the API returns
export type ResponseDataType = {
  itunesData: TrackInfoType[];
  beatportData: TrackInfoType[];
  amazonData: TrackInfoType[];
  bandcampData: TrackInfoType[];
};

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
