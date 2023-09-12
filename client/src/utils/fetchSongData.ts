export const fetchSongData = async () => {
  const dataUrl = new URL('https://api.buythattrack.com/itunes?song=test&artist=test&country=DE')
    .href;
  return await fetch(dataUrl).then((res) => res.json());
};
