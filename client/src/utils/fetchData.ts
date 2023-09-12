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

async function fetchVendorData(url: string) {
  const dataUrl = new URL(url).href;
  return await fetch(dataUrl).then((res) => res.json());
}

async function fetchSongData(artist: string, song: string) {
  const itunesData = fetchVendorData(
    `https://api.buythattrack.com/itunes?song=${song}&artist=${artist}&country=DE`
  );
  const beatportData = fetchVendorData(
    `https://api.buythattrack.com/beatport?song=${song}&artist=${artist}&country=DE`
  );
  const amazonData = fetchVendorData(
    `https://api.buythattrack.com/amazon?song=${song}&artist=${artist}&country=DE`
  );
  const bandcampData = fetchVendorData(
    `https://api.buythattrack.com/bandcamp?song=${song}&artist=${artist}&country=DE`
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
