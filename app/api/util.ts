import { SongVendorType } from '@/types';

export function createSongList(
  searchType: string,
  searchParams: URLSearchParams
): Array<SongVendorType> {
  const songList: Array<SongVendorType> = [];

  if (searchType === 'playlist') {
    const playlistUrl = searchParams.get('url');
    const song1 = { song: { artist: 'Above & Beyond', title: 'On a Good Day' }, prices: {} };
    const song2 = { song: { artist: 'Reflekt', title: 'Need to Feel Loved' }, prices: {} };
    songList.push(song1, song2);
  }
  if (searchType === 'single') {
    const title = searchParams.get('title');
    const artist = searchParams.get('artist');
    if (title !== null && artist !== null) {
      songList.push({ song: { artist, title }, prices: {} });
    }
  }

  return songList;
}

export async function fetchPrices(songList: Array<SongVendorType>): Promise<Array<SongVendorType>> {
  songList.forEach((song) => {
    // Try DB

    // Else fetch from vendor APIs (and save in DB)
    const prices = { amazon: 0.99, itunes: 0.99, beatport: 1.49, bandcamp: 0.99 };
    song.prices = prices;
  });

  // const product = await res.json();

  return songList;
}
