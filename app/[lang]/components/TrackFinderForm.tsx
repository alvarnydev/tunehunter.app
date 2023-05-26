'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { SongVendorType, DictTrackFinderTypes } from '@/types';
import SearchModeToggler from './TrackFinder/SearchModeToggler';
import SearchTextInput from './TrackFinder/SearchTextInput';
import SearchButton from './TrackFinder/SearchButton';

const samplePriceData: Array<SongVendorType> = [
  {
    song: { artist: 'A', title: 'B' },
    prices: { amazon: 0.99, itunes: 0.99, beatport: 1.49, bandcamp: 0.99 },
  },
];

const TrackFinder: React.FC<PropsWithChildren<DictTrackFinderTypes>> = ({
  dictTrackFinder,
  children,
}) => {
  const [priceData, setPriceData] = useState<SongVendorType[]>(samplePriceData);
  const [searchMode, setSearchMode] = useState('song');
  const [songSearchQuery, setSongSearchQuery] = useState({ artist: '', title: '' });
  const [playlistSearchString, setPlaylistSearchString] = useState('');

  const { search: buttonText, ...dictTextInput } = dictTrackFinder;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const songUrl = `/api/song?title=${songSearchQuery.title}&artist=${songSearchQuery.artist}`;
    const playlistUrl = `/api/playlist?url=${playlistSearchString}`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
    };

    if (searchMode === 'song') {
      await fetch(songUrl) // , { headers }
        .then((res) => res.json())
        .then((data) => {
          setPriceData(data);
        });
    } else if (searchMode === 'playlist') {
      await fetch(playlistUrl)
        .then((res) => res.json())
        .then((data) => {
          setPriceData(data);
        });
    }
  }

  return (
    <>
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
      {children}
    </>
  );
};

export default TrackFinder;
