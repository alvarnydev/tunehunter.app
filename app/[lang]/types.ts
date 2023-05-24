export type PriceDataType = {
  artist: string;
  song: string;
  prices: { amazon: number; itunes: number; beatport: number; bandcamp: number };
};
