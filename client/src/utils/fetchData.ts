// Top-level function to fetch data from our own API
export const fetchData = async ({
  queryKey,
}: {
  queryKey: [string, { searchParams: URLSearchParams }];
}) => {
  const [, { searchParams }] = queryKey;

  const type = searchParams.get('type');
  const country = searchParams.get('country');
  if (!type || !country) {
    throw new Error('Missing type or country!');
  }

  if (type == 'song') {
    const artist = searchParams.get('artist');
    const song = searchParams.get('song');
    if (!artist || !song) {
      throw new Error('Missing artist and/or title!');
    }
    return await fetchSongData(artist, song, country);
  } else if (type == 'playlist') {
    const url = searchParams.get('url');
    if (!url) {
      throw new Error('Missing playlist URL!');
    }
    return await fetchPlaylistData(url);
  }
};

// Mid-level API calls to our own backend
async function fetchSongData(artist: string, title: string, country: string) {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const itunesData = fetchApiData(
    `${apiUrl}/itunes?artist=${artist}&title=${title}&country=${country}`
  );
  const beatportData = fetchApiData(
    `${apiUrl}/beatport?artist=${artist}&title=${title}&country=${country}`
  );
  const amazonData = fetchApiData(
    `${apiUrl}/amazon?artist=${artist}&title=${title}&country=${country}`
  );
  const bandcampData = fetchApiData(
    `${apiUrl}/bandcamp?artist=${artist}&title=${title}&country=${country}`
  );

  const [itunes, beatport, amazon, bandcamp] = await Promise.all([
    itunesData,
    beatportData,
    amazonData,
    bandcampData,
  ]);

  return {
    itunes,
    beatport,
    amazon,
    bandcamp,
  };
}

async function fetchPlaylistData(url: string) {
  throw new Error('Not implemented');
  console.log(url);
}

// Low-level API call to third party APIs
async function fetchApiData(url: string) {
  const dataUrl = new URL(url).href;
  const apiKey = import.meta.env.VITE_API_KEY || '';
  return await fetch(dataUrl, { headers: { 'X-API-KEY': apiKey } }).then((res) => res.json());
}
