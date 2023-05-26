import { SongVendorType } from '@/types';
import { NextResponse } from 'next/server';

function createSongList(searchParams: URLSearchParams): Array<SongVendorType> {
  const songList: Array<SongVendorType> = [];

  const playlistUrl = searchParams.get('playlistUrl');
  const song = searchParams.get('song');
  const artist = searchParams.get('artist');

  // If playlist, get songs from playlist
  if (playlistUrl !== null) {
    const song1 = { song: { artist: 'Above & Beyond', song: 'On a Good Day' }, prices: {} };
    const song2 = { song: { artist: 'Reflekt', song: 'Need to Feel Loved' }, prices: {} };
    songList.push(song1, song2);
  }
  if (song !== null && artist !== null) {
    songList.push({ song: { artist, song }, prices: {} });
  }

  return songList;
}

async function fetchPrices(songList: Array<SongVendorType>): Promise<Array<SongVendorType>> {
  songList.forEach((song) => {
    // Try DB

    // Else fetch from vendor APIs (and save in DB)
    const prices = { amazon: 0.99, itunes: 0.99, beatport: 1.49, bandcamp: 0.99 };
    song.prices = prices;
  });

  // const res = await fetch(`https://data.mongodb-api.com/product/${song}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     //'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  // const product = await res.json();

  return songList;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  let songList = createSongList(searchParams);
  if (songList.length === 0) {
    return NextResponse.redirect('/404');
  }
  songList = await fetchPrices(songList);

  return NextResponse.json({ songList });
}
