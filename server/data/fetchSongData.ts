import axios from 'axios';
import { ITunesData, RequestDataType, TrackDataType, VendorDataType } from '../../globalTypes';
import { OurRequest } from '../utils/types';
import { sortByDuration } from '../utils/utils';

export const fetchStoreData = async (req: OurRequest, store: string): Promise<VendorDataType> => {
  console.log('--------- fetchStoreData: ', store, ' ---------');
  const { title, artist, duration, country } = req.query;
  const durationNum = parseInt(duration);
  const requestData: RequestDataType = { country, searchQuery: { artist, title, duration: durationNum } };

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

export const fetchItunesData = async ({ country, searchQuery: { title, artist, duration } }: RequestDataType): Promise<VendorDataType> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await axios.get<ITunesData>(dataUrl);
  const data = response.data;

  // Grab what we need from the response
  const vendorData: VendorDataType = {
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

export const fetchBeatportData = async ({ country, searchQuery: { title, artist, duration } }: RequestDataType): Promise<VendorDataType> => {
  return await fetchItunesData({ country, searchQuery: { title, artist, duration } });
};

export const fetchAmazonData = async ({ country, searchQuery: { title, artist, duration } }: RequestDataType): Promise<VendorDataType> => {
  return await fetchItunesData({ country, searchQuery: { title, artist, duration } });
};

export const fetchBandcampData = async ({ country, searchQuery: { title, artist, duration } }: RequestDataType): Promise<VendorDataType> => {
  return await fetchItunesData({ country, searchQuery: { title, artist, duration } });
};

export function fetchPlaceholderValues(vendor: string) {
  const response: VendorDataType = {
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
