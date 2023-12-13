import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../contexts/auth';
import { SpotifyDataType, Track } from '../../../../types';
import { MusicPlayingIndicator } from '../../../utils/IndicatorComponents';
import { FormDataType } from '../../../../../../types';
import { useLayoutEffect } from 'react';

interface ISpotifyTableBodyProps {
  tab: string;
  handleFormUpdate: (newFormData: FormDataType, final: boolean) => void;
  tableRef: React.RefObject<HTMLDivElement>;
  tableHeight: number;
  tableScroll: number;
}

const SpotifyTableBody = ({ tab, handleFormUpdate, tableRef, tableHeight, tableScroll }: ISpotifyTableBodyProps) => {
  const { userData } = useAuth();

  // Restore table height (tailwind stops evaluating h-[${tableHeight.current}px] correctly after some time, for whatever reason)
  useLayoutEffect(() => {
    if (tableRef.current == null) return;
    tableRef.current.style.height = `${tableHeight}px`;
    tableRef.current.scrollTop = tableScroll;
  }, []);

  return (
    <div ref={tableRef} className={`overflow-x-auto scrollbar-none rounded py-2 w-full resize-y h-[${tableHeight}px]`}>
      {tab == 'recentlyPlayed' && <RecentlyPlayedTable data={userData} handleFormUpdate={handleFormUpdate} />}
      {tab == 'mostPlayed' && <MostPlayedTable data={userData} handleFormUpdate={handleFormUpdate} />}
      {tab == 'queue' && <QueueTable data={userData} handleFormUpdate={handleFormUpdate} />}
    </div>
  );
};

interface ISpotifyDataTableBodyProps {
  data: SpotifyDataType;
  handleFormUpdate: (newFormData: FormDataType, final: boolean) => void;
}

const RecentlyPlayedTable = ({ data, handleFormUpdate }: ISpotifyDataTableBodyProps) => {
  if (data.recentlyPlayed?.items.length == 0)
    return (
      <div className='flex h-full justify-center items-center'>
        <p className='text-center'>You have no recently played songs</p>
      </div>
    );

  return (
    <table className='table table-fixed w-full'>
      <tbody>
        {data.currentlyPlaying?.is_playing && <TrackRow trackData={data.currentlyPlaying.item} currentlyPlaying={true} userCountry={data.profileData?.country} handleFormUpdate={handleFormUpdate} />}
        {data.recentlyPlayed?.items.map((item) => (
          <TrackRow key={item.played_at} trackData={item.track} userCountry={data.profileData?.country} handleFormUpdate={handleFormUpdate} />
        ))}
      </tbody>
    </table>
  );
};

const QueueTable = ({ data, handleFormUpdate }: ISpotifyDataTableBodyProps) => {
  if (data.queue?.queue.length == 0)
    return (
      <div className='flex h-full justify-center items-center'>
        <p className='text-center'>Your queue is currently empty</p>
      </div>
    );

  return (
    <table className='table table-fixed w-full'>
      <tbody>
        {data.queue?.queue.map((item, index) => (
          <TrackRow key={index} trackData={item} userCountry={data.profileData?.country} handleFormUpdate={handleFormUpdate} />
        ))}
      </tbody>
    </table>
  );
};

const MostPlayedTable = ({ data, handleFormUpdate }: ISpotifyDataTableBodyProps) => {
  if (data.topTracks?.items.length == 0)
    return (
      <div className='flex h-full justify-center items-center'>
        <p className='text-center'>We found no data for your most played songs.</p>
      </div>
    );

  return (
    <table className='table table-fixed w-full'>
      <tbody>
        {data.topTracks?.items.map((item) => (
          <TrackRow key={item.id} trackData={item} userCountry={data.profileData?.country} handleFormUpdate={handleFormUpdate} />
        ))}
      </tbody>
    </table>
  );
};

const TrackRow: React.FC<{
  trackData: Track;
  currentlyPlaying?: boolean;
  userCountry?: string;
  handleFormUpdate(newFormData: FormDataType, final: boolean): void;
}> = ({ trackData, currentlyPlaying, userCountry, handleFormUpdate }) => {
  const { t } = useTranslation();

  const startSearch = () => {
    const newFormData = {
      country: userCountry || 'DE',
      searchMode: 'song',
      songSearchQuery: {
        artist: trackData.artists[0].name,
        title: trackData.name,
        duration: trackData.duration_ms,
      },
      playlistSearchString: '',
    };

    handleFormUpdate(newFormData, true);
  };

  return (
    <tr className='[&>td]:border-0 relative [&>td]:rounded-none'>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar pr-2'>
            <div className={`mask mask-squircle w-10 h-10 `}>
              <img src={trackData.album.images[0].url} alt='Avatar Tailwind CSS Component' className='relative' />
            </div>
          </div>
          <div>
            <div>{trackData.artists[0].name}</div>
            <div className='text-sm opacity-50'>{trackData.artists[1]?.name}</div>
          </div>
        </div>
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {currentlyPlaying && <MusicPlayingIndicator size={12} />}
          <div className='inline'>{trackData.name.length >= 40 ? `${trackData.name.substring(0, 40)}...` : trackData.name}</div>
        </div>
      </td>
      <td className='absolute right-0 top-2'>
        <button className='btn btn-primary btn-outline btn-xs rounded-full' onClick={startSearch}>
          {t('searchbar.search')}
        </button>
      </td>
    </tr>
  );
};

export default SpotifyTableBody;
