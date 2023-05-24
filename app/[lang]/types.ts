export type priceDataType = {
  artist: string;
  song: string;
  prices: { amazon: number; itunes: number; beatport: number; bandcamp: number };
};
