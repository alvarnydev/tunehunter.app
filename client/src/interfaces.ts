import { SongTableTab, SpotifyData } from '@/types';
import { RequestData } from '../../globalTypes';

export interface ISpotifyTableProps {
  forceDelayedSubmit(): void;
  handleFormUpdate: (newFormData: RequestData) => void;
}
export interface ISpotifyTableBodyProps {
  tab: string;
  forceDelayedSubmit(): void;
  handleFormUpdate: (newFormData: RequestData) => void;
  tableRef: React.RefObject<HTMLDivElement>;
  tableHeight: number;
  tableScroll: number;
}
export interface ISpotifyTableHeaderProps {
  tab: string;
  handleTabUpdate: (newTab: SongTableTab) => void;
  dataRefreshTimer: React.MutableRefObject<number>;
  startDataRefresh: () => void;
}

export interface ISpotifyDataTableBodyProps {
  data: SpotifyData;
  handleFormUpdate: (newFormData: RequestData) => void;
  forceDelayedSubmit(): void;
}
