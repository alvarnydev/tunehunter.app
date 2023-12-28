import { SongTableTab, SpotifyData } from '@/types';
import { RequestData } from '../../globalTypes';

export interface ISpotifyTableBodyProps {
  tab: string;
  handleFormUpdate: (newFormData: RequestData, final: boolean) => void;
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
  handleFormUpdate: (newFormData: RequestData, final: boolean) => void;
}
