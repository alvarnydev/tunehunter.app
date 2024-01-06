import { SongTableTab, SpotifyData } from '@/types';
import { DataRequestQuery } from '../../globalTypes';

export interface ISpotifyTableProps {
  handleSubmit: (newFormData: DataRequestQuery) => void;
}
export interface ISpotifyTableBodyProps {
  tab: string;
  handleSubmit: (newFormData: DataRequestQuery) => void;
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
  handleSubmit: (newFormData: DataRequestQuery) => void;
}
