'use client';
import { useState } from 'react';
import { DictTrackFinderTypes } from '@/types';
import SearchModeToggler from './TrackFinder/SearchModeToggler';
import SearchTextInput from './TrackFinder/SearchTextInput';
import SearchButton from './TrackFinder/SearchButton';
import { useRouter } from 'next/navigation';

const TrackFinder: React.FC<DictTrackFinderTypes> = ({ dictTrackFinder }) => {
  const router = useRouter();

  const [searchMode, setSearchMode] = useState('song');
  const [songSearchQuery, setSongSearchQuery] = useState({ artist: '', title: '' });
  const [playlistSearchString, setPlaylistSearchString] = useState('');

  const { search: buttonText, ...dictTextInput } = dictTrackFinder;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchMode === 'song') {
      router.push(`/${searchMode}?title=${songSearchQuery.title}&artist=${songSearchQuery.artist}`);
    } else if (searchMode === 'playlist') {
      router.push(`/${searchMode}?url=${playlistSearchString}`);
    }
  }

  return (
    <form className='flex md:flex-row flex-col w-4/5 md:gap-10 gap-8' onSubmit={handleSubmit}>
      <SearchModeToggler
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        songSearchQuery={songSearchQuery}
        playlistSearchString={playlistSearchString}
        setSongSearchQuery={setSongSearchQuery}
        setPlaylistSearchString={setPlaylistSearchString}
      />
      <SearchTextInput
        dictTextInput={dictTextInput}
        searchMode={searchMode}
        songSearchQuery={songSearchQuery}
        setSongSearchQuery={setSongSearchQuery}
        playlistSearchString={playlistSearchString}
        setPlaylistSearchString={setPlaylistSearchString}
      />
      <SearchButton buttonText={buttonText} />
    </form>
  );
};

export default TrackFinder;
