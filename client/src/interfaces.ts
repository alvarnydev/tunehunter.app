import { FormDataType, SongTableTab, SpotifyDataType } from '@/types';

export interface ISpotifyTableBodyProps {
  tab: string;
  handleFormUpdate: (newFormData: FormDataType, final: boolean) => void;
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
  handleFormUpdate: (newFormData: FormDataType, final: boolean) => void;
}
