export const fetchData = async ({
  queryKey,
}: {
  queryKey: [string, { searchParams: URLSearchParams }];
}) => {
  const [, { searchParams }] = queryKey;

  const type = searchParams.get('type');

  if (type == 'song') {
    const artist = searchParams.get('artist');
    const song = searchParams.get('song');
    if (!artist || !song) {
      throw new Error('Missing artist or song');
    }
    return await fetchSongData(artist, song);
  } else if (type == 'playlist') {
    const url = searchParams.get('url');
    if (!url) {
      throw new Error('Missing playlist url');
    }
    return await fetchPlaylistData(url);
  }
};

async function fetchApiData(url: string) {
  const dataUrl = new URL(url).href;
  const apiKey = import.meta.env.VITE_API_KEY || '';
  return await fetch(dataUrl, { headers: { 'X-API-KEY': apiKey } }).then((res) => res.json());
}

async function fetchSongData(artist: string, song: string) {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const itunesData = fetchApiData(`${apiUrl}/itunes?song=${song}&artist=${artist}&country=DE`);
  const beatportData = fetchApiData(`${apiUrl}/beatport?song=${song}&artist=${artist}&country=DE`);
  const amazonData = fetchApiData(`${apiUrl}/amazon?song=${song}&artist=${artist}&country=DE`);
  const bandcampData = fetchApiData(`${apiUrl}/bandcamp?song=${song}&artist=${artist}&country=DE`);

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
