import axios from 'axios';
import { DataRequestQuery, TrackData, VendorData } from '../../globalTypes';
import { ITunesData, DataRequest } from '../types';
import { sortByMatchingDuration } from '../utils/sortingUtils';

export const fetchSpecificSong = async (req: DataRequest): Promise<DataRequestQuery> => {
  const { song } = await fetchItunesData(req.query);

  return {
    title: song.title,
    artist: song.artist,
    duration: song.duration,
    country: req.query.country,
  };
};

export const fetchVendorData = async (req: DataRequest, store: string): Promise<VendorData> => {
  const { title, artist, duration, country } = req.query;
  const requestData: DataRequestQuery = { country, artist, title, duration };

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

export const fetchPreviewData = async ({ country, title, artist, duration, album }: DataRequestQuery): Promise<TrackData[]> => {
  let dataUrl = new URL(`https://itunes.apple.com/search?country=${country}&media=music&entity=song&limit=5&term=${title}+${artist}`).href;
  if (album) dataUrl += `+${album}`;
  const response = await axios.get<ITunesData>(dataUrl);
  const data = response.data;

  // Grab what we need from the response
  const previewData: TrackData[] = data.results.map((song) => {
    return {
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      duration: song.trackTimeMillis,
      qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
      qualityKbps: 256, // todo: figure out kbps from song.previewUrl
      price: song.trackPrice,
      songLink: song.trackViewUrl,
      artLink: song.artworkUrl100.replace('100x100', '400x400'),
    };
  });

  if (duration) {
    previewData.sort(sortByMatchingDuration(duration));
  }
  return previewData;
};

const fetchItunesData = async ({ country, title, artist, duration, album }: DataRequestQuery): Promise<VendorData> => {
  let dataUrl = new URL(`https://itunes.apple.com/search?country=${country}&media=music&entity=song&limit=5&term=${title}+${artist}`).href;
  if (album) dataUrl += `+${album}`;
  const response = await axios.get<ITunesData>(dataUrl);
  const data = response.data;

  const songs = data.results.map((song) => {
    return {
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      duration: song.trackTimeMillis,
      qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
      qualityKbps: 256, // todo: figure out kbps from song.previewUrl
      price: song.trackPrice,
      songLink: song.trackViewUrl,
      artLink: song.artworkUrl100,
    };
  });
  if (duration) {
    songs.sort(sortByMatchingDuration(duration));
  }

  return {
    vendor: {
      name: 'iTunes Store',
      country,
    },
    song: songs[0],
  };
};

const fetchBeatportData = async ({ country, title, artist, duration }: DataRequestQuery): Promise<VendorData> => {
  const beatportData = await fetchItunesData({ country, title, artist, duration });
  beatportData.vendor.name = 'Beatport';
  return beatportData;
};

const fetchAmazonData = async ({ country, title, artist, duration }: DataRequestQuery): Promise<VendorData> => {
  const amazonData = await fetchItunesData({ country, title, artist, duration });
  amazonData.vendor.name = 'Amazon Music';
  return amazonData;
};

const fetchBandcampData = async ({ country, title, artist, duration }: DataRequestQuery): Promise<VendorData> => {
  const bandcampData = await fetchItunesData({ country, title, artist, duration });
  bandcampData.vendor.name = 'Bandcamp';
  return bandcampData;
};

function fetchPlaceholderValues(vendor: string) {
  const response: VendorData = {
    vendor: {
      name: vendor,
      country: 'DE',
    },
    song: {
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
  };

  return response;
}
