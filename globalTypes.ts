// What we request from our API
export type RequestData = {
  country: string;
  artist: string;
  title: string;
  duration: number;
};

// What our API returns
export type ResponseData = {
  preview: TrackData[];
  itunes: VendorData;
  beatport: VendorData;
  amazon: VendorData;
  bandcamp: VendorData;
};

export type VendorData = {
  vendor: {
    name: string;
    country: string;
  };
  song: TrackData;
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
