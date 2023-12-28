import axios from 'axios';
import { ResponseData, TrackData, VendorData } from '../../../../globalTypes';

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
  return await fetchData(artist, title, country);
};

// Mid-level custom API calls to our own backend
async function fetchData(artist: string, title: string, country: string): Promise<ResponseData> {
  // fetch preview and take itunes data from it as the 0 index
  const previewResponse = fetchPreviewData(artist, title, country);

  // fetch other vendor data
  const itunesResponse = fetchVendorData(artist, title, country, 'itunes');
  const beatportResponse = fetchVendorData(artist, title, country, 'beatport');
  const amazonResponse = fetchVendorData(artist, title, country, 'amazon');
  const bandcampResponse = fetchVendorData(artist, title, country, 'bandcamp');

  const [previewData, itunesData, beatportData, amazonData, bandcampData] = await Promise.all([previewResponse, itunesResponse, beatportResponse, amazonResponse, bandcampResponse]);

  return { preview: previewData, itunes: itunesData, beatport: beatportData, amazon: amazonData, bandcamp: bandcampData };
}

// Low-level API call to our own backend
async function fetchVendorData(artist: string, title: string, country: string, vendor: string): Promise<VendorData> {
  const dataUrl = new URL(`${apiUrl}/${vendor}?artist=${artist}&title=${title}&country=${country}`).href;
  return await axios<VendorData>(dataUrl, { headers: { 'X-API-KEY': apiKey }, timeout: 5000 }).then((res) => res.data);
}

async function fetchPreviewData(artist: string, title: string, country: string): Promise<TrackData[]> {
  const dataUrl = new URL(`${apiUrl}/preview?artist=${artist}&title=${title}&country=${country}`).href;
  return await axios<TrackData[]>(dataUrl, { headers: { 'X-API-KEY': apiKey }, timeout: 5000 }).then((res) => res.data);
}
