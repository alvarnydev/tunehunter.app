export type SongType = {
  artist: string;
  title: string;
};

export type SongVendorType = {
  song: SongType;
  prices: { amazon: number; itunes: number; beatport: number; bandcamp: number } | {};
};

export type DictTrackFinderTypes = {
  dictTrackFinder: { artist: string; song: string; search: string };
};

export type DictResultsTableTypes = {
  dictResultsTable: {
    header: {
      store: string;
      quality: string;
      price: string;
      artistsshare: string;
      link: string;
    };
    buy: string;
  };
};

export type DictTextInputTypes = {
  artist: string;
  song: string;
};
