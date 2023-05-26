import { DictTextInputTypes, SongType } from './types';

export interface ISearchTextInputProps {
  dictTextInput: DictTextInputTypes;
  searchMode: string;
  songSearchQuery: SongType;
  playlistSearchString: string;
  setSongSearchQuery: (songInput: SongType) => void;
  setPlaylistSearchString: (playlistInput: string) => void;
}

export interface ISongInputProps {
  dictSongInput: DictTextInputTypes;
  songSearchQuery: SongType;
  setSongSearchQuery: (songInput: SongType) => void;
}

export interface IPlaylistInputProps {
  playlistSearchString: string;
  setPlaylistSearchString: (playlistInput: string) => void;
}

export interface ISearchModeTogglerProps {
  searchMode: string;
  setSearchMode: (searchMode: string) => void;
  songSearchQuery: SongType;
  playlistSearchString: string;
  setSongSearchQuery: (songInput: SongType) => void;
  setPlaylistSearchString: (playlistInput: string) => void;
}
