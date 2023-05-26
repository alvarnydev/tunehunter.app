import { IPlaylistInputProps, ISearchTextInputProps, ISongInputProps } from '@/interfaces';

const SearchTextInput = ({
  dictTextInput,
  searchMode,
  songSearchQuery,
  playlistSearchString,
  setSongSearchQuery,
  setPlaylistSearchString,
}: ISearchTextInputProps) => {
  return (
    <div className='w-full flex md:flex-row flex-col md:gap-10 gap-8 order-2'>
      {searchMode === 'song' && (
        <SongInput
          dictSongInput={dictTextInput}
          songSearchQuery={songSearchQuery}
          setSongSearchQuery={setSongSearchQuery}
        />
      )}
      {searchMode === 'playlist' && (
        <PlaylistInput
          playlistSearchString={playlistSearchString}
          setPlaylistSearchString={setPlaylistSearchString}
        />
      )}
    </div>
  );
};

const SongInput = ({ dictSongInput, songSearchQuery, setSongSearchQuery }: ISongInputProps) => {
  function handleArtistChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSongSearchQuery({ ...songSearchQuery, artist: value });
  }

  function handleSongChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSongSearchQuery({ ...songSearchQuery, title: value });
  }

  return (
    <>
      <input
        type='text'
        placeholder={dictSongInput.artist}
        className='input input-primary rounded-full md:w-full border-2 tracking-wide'
        value={songSearchQuery.artist}
        onChange={handleArtistChange}
      />
      <input
        type='text'
        placeholder={dictSongInput.song}
        className='input rounded-full input-primary md:w-full border-2 tracking-wide'
        value={songSearchQuery.title}
        onChange={handleSongChange}
      />
    </>
  );
};

const PlaylistInput = ({ playlistSearchString, setPlaylistSearchString }: IPlaylistInputProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPlaylistSearchString(value);
  }

  return (
    <input
      type='text'
      placeholder='https://open.spotify.com/playlist/4Zn1Wd...'
      className='input input-primary rounded-full md:w-full border-2 tracking-wide'
      value={playlistSearchString}
      onChange={handleChange}
    />
  );
};

export default SearchTextInput;
