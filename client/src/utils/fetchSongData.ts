export const fetchSongData = async () => {
  const dataUrl = new URL(
    'https://itunes.apple.com/search?term=need+to+feel+loved&country=DE&media=music&entity=song&limit=5'
  ).href;
  const response = await fetch(dataUrl).then((res) => res.json());
  return response;
};
