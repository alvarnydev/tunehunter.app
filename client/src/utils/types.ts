export type ResultsRowType = {
  company: companyDataType;
  song: songDataType;
};

export type companyDataType = {
  name: string;
  logo: string;
  country: string;
  artistsShare: number;
};

export type songDataType = {
  title: string;
  artist: string;
  album: string;
  duration: number;
  qualityFormat: string;
  qualityKbps: number;
  price: number;
  link: string;
};
