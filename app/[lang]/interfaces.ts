import { DictTextInputTypes } from './types';

export interface ISearchTextInputProps {
  dictTextInput: DictTextInputTypes;
  searchMode: string;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
  setSongSearchQuery: (songInput: { artist: string; song: string }) => void;
  setPlaylistSearchString: (playlistInput: string) => void;
}

export interface ISongInputProps {
  dictSongInput: DictTextInputTypes;
  songSearchQuery: { artist: string; song: string };
  setSongSearchQuery: (songInput: { artist: string; song: string }) => void;
}

export interface IPlaylistInputProps {
  playlistSearchString: string;
  setPlaylistSearchString: (playlistInput: string) => void;
}

export interface ISearchModeTogglerProps {
  searchMode: string;
  setSearchMode: (searchMode: string) => void;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
  setSongSearchQuery: (songInput: { artist: string; song: string }) => void;
  setPlaylistSearchString: (playlistInput: string) => void;
}
