export type LogRequestBody = {
  error: Error;
  info: { customMessage?: string; componentStack?: string };
};

// What we request from our API
export type DataRequestQuery = {
  country: string;
  artist: string;
  title: string;
  duration?: number;
  album?: string;
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
