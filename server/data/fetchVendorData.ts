import axios from 'axios';
import { RequestData, TrackData, VendorData } from '../../globalTypes';
import { ITunesData, VendorDataRequest } from '../utils/types';
import { sortByDuration } from '../utils/utils';

export const fetchVendorData = async (req: VendorDataRequest, store: string): Promise<VendorData> => {
  console.log('--------- fetchStoreData: ', store, ' ---------');
  const { title, artist, duration, country } = req.query;
  const requestData: RequestData = { country, artist, title, duration };
  console.log('requestData: ', requestData);

  switch (store) {
    case 'itunes':
      return await fetchItunesData(requestData);
    case 'beatport':
      return await fetchBeatportData(requestData);
    case 'amazon':
      return await fetchAmazonData(requestData);
    case 'bandcamp':
      return await fetchBandcampData(requestData);
    default:
      return fetchPlaceholderValues('song store');
  }
};

export const fetchItunesData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await axios.get<ITunesData>(dataUrl);
  const data = response.data;

  // Grab what we need from the response
  const vendorData: VendorData = {
    vendor: {
      name: 'iTunes Store',
      country,
    },
    songs: data.results.map((song) => {
      return {
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        duration: song.trackTimeMillis / 1000,
        qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
        qualityKbps: 256, // todo: figure out kbps from song.previewUrl
        price: song.trackPrice,
        songLink: song.trackViewUrl,
        artLink: song.artworkUrl100,
      };
    }),
  };

  // Sort the songs by matching duration
  console.log('  <<   start    >>    ');
  vendorData.songs.map((song) => {
    console.log('arist ', song.artist);
    console.log('title ', song.title);
    console.log('duration ', song.duration);
  });
  console.log('  <<   sort    >>    ');

  vendorData.songs.sort(sortByDuration(duration));
  vendorData.songs.map((song) => {
    console.log('arist ', song.artist);
    console.log('title ', song.title);
    console.log('duration ', song.duration);
  });
  console.log('  <<   end    >>    ');

  return vendorData;
};

export const fetchBeatportData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  return await fetchItunesData({ country, title, artist, duration });
};

export const fetchAmazonData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  return await fetchItunesData({ country, title, artist, duration });
};

export const fetchBandcampData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  return await fetchItunesData({ country, title, artist, duration });
};

export function fetchPlaceholderValues(vendor: string) {
  const response: VendorData = {
    vendor: {
      name: vendor,
      country: 'DE',
    },
    songs: [
      {
        title: 'ph title',
        artist: 'ph artist',
        album: 'song album',
        duration: 213,
        qualityFormat: 'MP3', // todo: figure out format from song.previewUrl
        qualityKbps: 320, // todo: figure out kbps from song.previewUrl
        price: 1.29,
        songLink: 'fancy link',
        artLink: 'album',
      },
      {
        title: 'ph title 2',
        artist: 'ph artist 2',
        album: 'song album 2',
        duration: 187,
        qualityFormat: 'MP3 2', // todo: figure out format from song.previewUrl
        qualityKbps: 320, // todo: figure out kbps from song.previewUrl
        price: 2.29,
        songLink: 'fancy link',
        artLink: 'album',
      },
    ],
  };

  return response;
}
