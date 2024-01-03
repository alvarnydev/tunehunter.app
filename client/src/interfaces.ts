import { SongTableTab, SpotifyData } from '@/types';
import { RequestData } from '../../globalTypes';

export interface ISpotifyTableProps {
  handleSubmit: (newFormData: RequestData) => void;
}
export interface ISpotifyTableBodyProps {
  tab: string;
  handleSubmit: (newFormData: RequestData) => void;
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
  handleSubmit: (newFormData: RequestData) => void;
}
