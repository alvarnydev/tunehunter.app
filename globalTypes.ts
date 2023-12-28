// What we request from our API
export type RequestDataType = {
  country: string;
  artist: string;
  title: string;
  duration: number;
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
