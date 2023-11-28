import { TrackInfoType } from '../../types';

export const fetchItunesData = async (title: string, artist: string, duration: number, country: string): Promise<TrackInfoType[]> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await fetch(dataUrl).then((res) => res.json());

  // Sort songs by matching duration
  const filteredSongs = response.results.filter((song: any) => {
    return song.trackTimeMillis / 1000 === duration; // Todo
  });

  // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
  const filteredResponse: TrackInfoType[] = filteredSongs.results.map((song: any) => {
    return {
      vendor: {
        name: 'iTunes Store',
        country: song.country,
        songLink: song.trackViewUrl,
        artLink: song.artworkUrl100,
      },
      song: {
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        duration: song.trackTimeMillis / 1000,
        qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
        qualityKbps: 256, // todo: figure out kbps from song.previewUrl
        price: song.trackPrice,
      },
    };
  });
  return filteredResponse;
};

export const fetchBeatportData = async (title: string, artist: string, duration: number, country: string): Promise<TrackInfoType[]> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await fetch(dataUrl).then((res) => res.json());

  // Sort songs by matching duration
  const filteredSongs = response.results.filter((song: any) => {
    return song.trackTimeMillis / 1000 === duration; // Todo
  });

  // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
  const filteredResponse: TrackInfoType[] = filteredSongs.results.map((song: any) => {
    return {
      vendor: {
        name: 'Beatport',
        country: song.country,
        songLink: song.trackViewUrl,
        artLink: song.artworkUrl100,
      },
      song: {
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        duration: song.trackTimeMillis / 1000,
        qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
        qualityKbps: 256, // todo: figure out kbps from song.previewUrl
        price: song.trackPrice,
      },
    };
  });
  return filteredResponse;
};

export const fetchAmazonData = async (title: string, artist: string, duration: number, country: string): Promise<TrackInfoType[]> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await fetch(dataUrl).then((res) => res.json());

  // Sort songs by matching duration
  const filteredSongs = response.results.filter((song: any) => {
    return song.trackTimeMillis / 1000 === duration; // Todo
  });

  // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
  const filteredResponse: TrackInfoType[] = filteredSongs.results.map((song: any) => {
    return {
      vendor: {
        name: 'Amazon Music',
        country: song.country,
        songLink: song.trackViewUrl,
        artLink: song.artworkUrl100,
      },
      song: {
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        duration: song.trackTimeMillis / 1000,
        qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
        qualityKbps: 256, // todo: figure out kbps from song.previewUrl
        price: song.trackPrice,
      },
    };
  });
  return filteredResponse;
};

export const fetchBandcampData = async (title: string, artist: string, duration: number, country: string): Promise<TrackInfoType[]> => {
  const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
  const response = await fetch(dataUrl).then((res) => res.json());

  // Sort songs by matching duration
  const filteredSongs = response.results.filter((song: any) => {
    return song.trackTimeMillis / 1000 === duration; // Todo
  });

  // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
  const filteredResponse: TrackInfoType[] = filteredSongs.results.map((song: any) => {
    return {
      vendor: {
        name: 'Bandcamp',
        country: song.country,
        songLink: song.trackViewUrl,
        artLink: song.artworkUrl100,
      },
      song: {
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        duration: song.trackTimeMillis / 1000,
        qualityFormat: 'AAC', // todo: figure out format from song.previewUrl
        qualityKbps: 256, // todo: figure out kbps from song.previewUrl
        price: song.trackPrice,
      },
    };
  });
  return filteredResponse;
};

export function fetchPlaceholderValues(vendor: string) {
  const response: TrackInfoType[] = [
    {
      vendor: {
        name: vendor,
        country: 'DE',
        songLink: 'fancy link',
        artLink: 'album',
      },
      song: {
        title: 'ph title',
        artist: 'ph artist',
        album: 'song album',
        duration: 213,
        qualityFormat: 'MP3', // todo: figure out format from song.previewUrl
        qualityKbps: 320, // todo: figure out kbps from song.previewUrl
        price: 1.29,
      },
    },
    {
      vendor: {
        name: 'itunesstore 2',
        country: 'testcountry 2',
        songLink: 'fancy link 2',
        artLink: 'album 2',
      },
      song: {
        title: 'ph title 2',
        artist: 'ph artist 2',
        album: 'song album 2',
        duration: 187,
        qualityFormat: 'MP3 2', // todo: figure out format from song.previewUrl
        qualityKbps: 320, // todo: figure out kbps from song.previewUrl
        price: 2.29,
      },
    },
  ];

  return response;
}
