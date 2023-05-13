import { useTranslation } from 'react-i18next';

interface SearchInputProps {
  searchMode: string;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
  setSongSearchQuery: (songInput: { artist: string; song: string }) => void;
  setPlaylistSearchString: (playlistInput: string) => void;
}

const SearchInput = ({
  searchMode,
  songSearchQuery,
  playlistSearchString,
  setSongSearchQuery,
  setPlaylistSearchString,
}: SearchInputProps) => {
  return (
    <div className='w-full flex md:flex-row flex-col md:gap-10 gap-8 order-2'>
      {searchMode === 'song' && (
        <SongInput songSearchQuery={songSearchQuery} setSongSearchQuery={setSongSearchQuery} />
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

interface SongInputProps {
  songSearchQuery: { artist: string; song: string };
  setSongSearchQuery: (songInput: { artist: string; song: string }) => void;
}

const SongInput = ({ songSearchQuery, setSongSearchQuery }: SongInputProps) => {
  const { t } = useTranslation();

  function handleArtistChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSongSearchQuery({ ...songSearchQuery, artist: value });
  }

  function handleSongChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSongSearchQuery({ ...songSearchQuery, song: value });
  }

  return (
    <>
      <input
        type='text'
        placeholder={t('pricefinder.artist')}
        className='input input-primary rounded-full md:w-full border-2 tracking-wide'
        value={songSearchQuery.artist}
        onChange={handleArtistChange}
      />
      <input
        type='text'
        placeholder={t('pricefinder.song')}
        className='input rounded-full input-primary md:w-full border-2 tracking-wide'
        value={songSearchQuery.song}
        onChange={handleSongChange}
      />
    </>
  );
};

interface PlaylistInputProps {
  playlistSearchString: string;
  setPlaylistSearchString: (playlistInput: string) => void;
}

const PlaylistInput = ({ playlistSearchString, setPlaylistSearchString }: PlaylistInputProps) => {
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

export default SearchInput;
