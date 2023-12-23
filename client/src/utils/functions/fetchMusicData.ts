import axios from 'axios';
import { ResponseDataType, VendorDataType } from '../../../../globalTypes';

const apiUrl = import.meta.env.VITE_API_URL || '';
const apiKey = import.meta.env.VITE_API_KEY || '';

// Top-level function to fetch data from our own API
export const fetchMusicData = async ({ queryKey }: { queryKey: [string, { searchParams: URLSearchParams }] }) => {
  const [, { searchParams }] = queryKey;

  const country = searchParams.get('country');
  if (!country) {
    throw new Error('Missing country!');
  }

  const artist = searchParams.get('artist');
  const title = searchParams.get('title');
  if (!artist || !title) {
    throw new Error('Missing artist and/or title!');
  }
  return await fetchSongData(artist, title, country);
};

// Mid-level custom API calls to our own backend
async function fetchSongData(artist: string, title: string, country: string): Promise<ResponseDataType> {
  const itunesResponse = fetchFromAPI(artist, title, country, 'itunes');
  const beatportResponse = fetchFromAPI(artist, title, country, 'beatport');
  const amazonResponse = fetchFromAPI(artist, title, country, 'amazon');
  const bandcampResponse = fetchFromAPI(artist, title, country, 'bandcamp');

  const [itunesData, beatportData, amazonData, bandcampData] = await Promise.all([itunesResponse, beatportResponse, amazonResponse, bandcampResponse]);

  return { itunesData, beatportData, amazonData, bandcampData };
}

// Low-level API call to our own backend
async function fetchFromAPI(artist: string, title: string, country: string, vendor: string): Promise<VendorDataType> {
  const dataUrl = new URL(`${apiUrl}/${vendor}?artist=${artist}&title=${title}&country=${country}`).href;
  return await axios<VendorDataType>(dataUrl, { headers: { 'X-API-KEY': apiKey }, timeout: 5000 }).then((res) => res.data);
}
