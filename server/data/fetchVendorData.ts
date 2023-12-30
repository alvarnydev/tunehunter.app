import axios from 'axios';
import { RequestData, TrackData, VendorData } from '../../globalTypes';
import { ITunesData, DataRequest } from '../utils/types';
import { sortByMatchingDuration } from '../utils/sorting';

export const fetchSpecificSong = async (req: DataRequest): Promise<RequestData> => {
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
  const requestData: RequestData = { country, artist, title, duration };

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

export const fetchPreviewData = async ({ country, title, artist, duration }: RequestData): Promise<TrackData[]> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await axios.get<ITunesData>(dataUrl);
  const data = response.data;

  // Grab what we need from the response
  const previewData: TrackData[] = data.results.map((song) => {
    return {
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      duration: song.trackTimeMillis / 1000,
      qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
      qualityKbps: 256, // todo: figure out kbps from song.previewUrl
      price: song.trackPrice,
      songLink: song.trackViewUrl,
      artLink: song.artworkUrl100.replace('100x100', '400x400'),
    };
  });

  if (duration) {
    previewData.sort(sortByMatchingDuration(duration / 1000));
  }
  return previewData;
};

const fetchItunesData = async ({ country, title, artist, duration }: RequestData): Promise<VendorData> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await axios.get<ITunesData>(dataUrl);
  const data = response.data;

  const songs = data.results.map((song) => {
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
