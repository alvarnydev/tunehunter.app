export type ResultsRowType = {
  company: CompanyDataType;
  song: SongDataType;
};

export type ResultsDataType = {
  itunesData: ResultsRowType;
  beatportData: ResultsRowType;
  amazonData: ResultsRowType;
  bandcampData: ResultsRowType;
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
