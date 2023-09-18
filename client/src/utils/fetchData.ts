import { ApiResponseDataType, TrackInfoType } from '../../../types';

// Top-level function to fetch data from our own API
export const fetchData = async ({
  queryKey,
}: {
  queryKey: [string, { searchParams: URLSearchParams }];
}) => {
  const [, { searchParams }] = queryKey;

  console.log(searchParams);
  const type = searchParams.get('type');
  const country = searchParams.get('country');
  if (!type || !country) {
    throw new Error('Missing type or country!');
  }

  if (type == 'song') {
    const artist = searchParams.get('artist');
    const title = searchParams.get('title');
    if (!artist || !title) {
      throw new Error('Missing artist and/or title!');
    }
    return await fetchSongData(artist, title, country);
  } else if (type == 'playlist') {
    const url = searchParams.get('url');
    if (!url) {
      throw new Error('Missing playlist URL!');
    }
    return await fetchPlaylistData(url);
  }
};

// Mid-level API calls to our own backend
async function fetchSongData(
  artist: string,
  title: string,
  country: string
): Promise<ApiResponseDataType> {
  const itunesResponse = fetchApiData(artist, title, country, 'itunes');
  const beatportResponse = fetchApiData(artist, title, country, 'beatport');
  const amazonResponse = fetchApiData(artist, title, country, 'amazon');
  const bandcampResponse = fetchApiData(artist, title, country, 'bandcamp');

  const [itunesData, beatportData, amazonData, bandcampData] = await Promise.all([
    itunesResponse,
    beatportResponse,
    amazonResponse,
    bandcampResponse,
  ]);

  return { itunesData, beatportData, amazonData, bandcampData };
}

async function fetchPlaylistData(url: string) {
  throw new Error('Not yet implemented');
  console.log(url);
}

// Low-level API call to our own backend
async function fetchApiData(
  artist: string,
  title: string,
  country: string,
  vendor: string
): Promise<TrackInfoType[]> {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const apiKey = import.meta.env.VITE_API_KEY || '';

  const dataUrl = new URL(`${apiUrl}/${vendor}?artist=${artist}&title=${title}&country=${country}`)
    .href;
  return await fetch(dataUrl, { headers: { 'X-API-KEY': apiKey } }).then((res) =>
    res.json().then((data) => data as TrackInfoType[])
  );
}