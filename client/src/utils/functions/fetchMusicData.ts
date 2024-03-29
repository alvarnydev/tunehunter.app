import axios from 'axios';
import { DataRequestQuery, ResponseData, TrackData, VendorData } from '../../../../globalTypes';

const apiUrl = import.meta.env.VITE_API_URL || '';

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
  const requestData: DataRequestQuery = { artist, title, country };
  if (searchParams.get('duration')) requestData.duration = Number(searchParams.get('duration'));
  if (searchParams.get('album')) requestData.album = searchParams.get('album') || undefined;
  return await fetchData(requestData);
};

// Mid-level custom API calls to our own backend
async function fetchData(requestData: DataRequestQuery): Promise<ResponseData> {
  const previewResponse = await fetchPreviewData(requestData);
  if (!requestData.duration) requestData.duration = previewResponse[0].duration;
  if (!requestData.album) requestData.album = previewResponse[0].album;

  const itunesResponse = fetchVendorData(requestData, 'itunes');
  const beatportResponse = fetchVendorData(requestData, 'beatport');
  const amazonResponse = fetchVendorData(requestData, 'amazon');
  const bandcampResponse = fetchVendorData(requestData, 'bandcamp');

  const [previewData, itunesData, beatportData, amazonData, bandcampData] = await Promise.all([previewResponse, itunesResponse, beatportResponse, amazonResponse, bandcampResponse]);

  return { preview: previewData, itunes: itunesData, beatport: beatportData, amazon: amazonData, bandcamp: bandcampData };
}

// Low-level API call to our own backend
async function fetchVendorData({ artist, title, country, duration, album }: DataRequestQuery, vendor: string): Promise<VendorData> {
  let dataUrl = new URL(`${apiUrl}/${vendor}?artist=${artist}&title=${title}&country=${country}&duration=${duration}`).href;
  if (album) dataUrl += `&album=${album}`;
  return await axios<VendorData>(dataUrl, { timeout: 10_000 }).then((res) => res.data);
}

async function fetchPreviewData({ artist, title, country, duration, album }: DataRequestQuery): Promise<TrackData[]> {
  let urlString = `${apiUrl}/preview?artist=${artist}&title=${title}&country=${country}`;
  if (duration) urlString += `&duration=${duration}`;
  if (album) urlString += `&album=${album}`;

  const dataUrl = new URL(urlString).href;
  return await axios<TrackData[]>(dataUrl, { timeout: 10_000 }).then((res) => res.data);
}
