import { SongTableTab, SpotifyDataType } from '@/types';
import { RequestDataType } from '../../globalTypes';

export interface ISpotifyTableBodyProps {
  tab: string;
  handleFormUpdate: (newFormData: RequestDataType, final: boolean) => void;
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
  data: SpotifyDataType;
  handleFormUpdate: (newFormData: RequestDataType, final: boolean) => void;
}
