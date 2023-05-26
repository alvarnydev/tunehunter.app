import { NextResponse } from 'next/server';
import { createSongList, fetchPrices } from '../util';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  let songList = createSongList('playlist', searchParams);
  if (songList.length === 0) {
    return NextResponse.redirect('/404');
  }
  songList = await fetchPrices(songList);

  return NextResponse.json({ songList });
}
