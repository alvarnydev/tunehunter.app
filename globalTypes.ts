// What we request from our API
export type RequestData = {
  country: string;
  artist: string;
  title: string;
  duration: number;
};

// What our API returns
export type ResponseData = {
  itunesData: VendorData;
  beatportData: VendorData;
  amazonData: VendorData;
  bandcampData: VendorData;
};

export type VendorData = {
  vendor: {
    name: string;
    country: string;
  };
  songs: TrackData[];
};

export type TrackData = {
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
