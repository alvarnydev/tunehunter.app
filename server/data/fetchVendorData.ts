import axios from 'axios';
import { RequestData, TrackData, VendorData } from '../../globalTypes';
import { ITunesData, VendorDataRequest } from '../utils/types';
import { sortByMatchingDuration } from '../utils/utils';

export const fetchSpecificSong = async (req: VendorDataRequest): Promise<RequestData> => {
  const { songs } = await fetchItunesData(req.query);

  return {
    title: songs[0].title,
    artist: songs[0].artist,
    duration: songs[0].duration,
    country: req.query.country,
  };
};

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

const fetchItunesData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
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

  if (duration) {
    vendorData.songs.sort(sortByMatchingDuration(duration));
  }
  return vendorData;
};

const fetchBeatportData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  return await fetchItunesData({ country, title, artist, duration });
};

const fetchAmazonData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  return await fetchItunesData({ country, title, artist, duration });
};

const fetchBandcampData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  return await fetchItunesData({ country, title, artist, duration });
};

function fetchPlaceholderValues(vendor: string) {
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
