import { useAuth } from '@/contexts/auth';
import { SongTableTab, Track } from '@/types';
import { requestAuthorizationCodePKCE } from '@/utils/functions/fetchSpotifyAuth';
import { storeInLocalStorage } from '@/utils/localStorageUtils';
import { PropsWithChildren, memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../atoms/InfoComponents';
import { ISpotifyDataTableBodyProps, ISpotifyTableBodyProps, ISpotifyTableHeaderProps } from '@/interfaces';
import { IoMdRefresh } from 'react-icons/io';
import { MusicPlayingIndicator } from '../atoms/IndicatorComponents';
import { RequestDataType } from '../../../../globalTypes';

const IntegrationText = () => {
  const { t } = useTranslation();

  const startIntegration = () => {
    storeInLocalStorage('redirect_path', window.location.pathname + window.location.search);
    requestAuthorizationCodePKCE();
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
      <p className='pr-2'>{t('spotify.integration')}</p>
      <div className='flex items-center'>
        <button className='btn btn-info btn-xs rounded-full' onClick={startIntegration}>
          Spotify Integration
        </button>
        <InfoAnnotation infoText={t('spotify.annotation')} />
      </div>
    </div>
  );
};

const SpotifyTable = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: RequestDataType, final: boolean) => void }) => {
  const { isAuthenticated, userData, refreshData } = useAuth();
  const tableHeight = useRef(208);
  const tableScroll = useRef(0);
  const tableRef = useRef<HTMLDivElement>(null);
  const dataRefreshTimer = useRef(new Date().getTime() + 60_000);

  const startDataRefresh = useCallback(() => {
    saveTableInfo();
    refreshData();
  }, [refreshData]);

  const saveTableInfo = (scroll?: number) => {
    if (tableRef.current == null) return;
    tableHeight.current = tableRef.current.getBoundingClientRect().height;
    tableScroll.current = scroll === 0 ? scroll : tableRef.current.scrollTop;
  };

  // Refresh data when song is finished or every 60 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    let timer: NodeJS.Timeout;
    const refreshInterval = 60_000;
    let timeLeft;
    let isPlaying;
    if (userData.currentlyPlaying) {
      timeLeft = userData.currentlyPlaying.item.duration_ms - userData.currentlyPlaying.progress_ms;
      isPlaying = userData.currentlyPlaying.is_playing;
    }

    const refreshDataAfter = async (time: number) => {
      dataRefreshTimer.current = new Date().getTime() + (time + 500);
      timer = setTimeout(() => {
        startDataRefresh();
      }, time);
    };

    if (userData.recentlyPlayed === null) {
      startDataRefresh();
    } else if (isPlaying && timeLeft && timeLeft < refreshInterval) {
      refreshDataAfter(timeLeft);
    } else {
      refreshDataAfter(refreshInterval);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, userData, startDataRefresh]);
  const [tab, setTab] = useState<SongTableTab>('recentlyPlayed');

  const handleTabUpdate = (newTab: SongTableTab) => {
    saveTableInfo(0);
    setTab(newTab);
  };

  return (
    <SpotifyTableLayout loading={userData.recentlyPlayed === null}>
      <SpotifyTableHeader tab={tab} handleTabUpdate={handleTabUpdate} dataRefreshTimer={dataRefreshTimer} startDataRefresh={startDataRefresh} />
      <SpotifyTableBody tab={tab} handleFormUpdate={handleFormUpdate} tableRef={tableRef} tableHeight={tableHeight.current} tableScroll={tableScroll.current} />
    </SpotifyTableLayout>
  );
};

const SpotifyTableLayout = ({ children }: PropsWithChildren<{ loading: boolean }>) => {
  return <div className={`w-3/4 rounded-xl shadow-md shadow-neutral pt-2 px-2  `}>{children}</div>;
};

const SpotifyTableHeader = ({ tab, handleTabUpdate, dataRefreshTimer, startDataRefresh }: ISpotifyTableHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex justify-center py-2 mx-[2%] border-b-neutral border-b-[1px]'>
      <div className='w-full flex justify-between items-center'>
        <div>
          <p> {t('spotifyBox.prompt')}</p>
        </div>
        <TabPicker tab={tab} handleTabUpdate={handleTabUpdate} />
        <TimeLeftIndicator dataRefreshTimer={dataRefreshTimer} startDataRefresh={startDataRefresh} />
      </div>
    </div>
  );
};

const TabPicker = ({ tab, handleTabUpdate }: { tab: string; handleTabUpdate: (newTab: SongTableTab) => void }) => {
  const { t } = useTranslation();

  return (
    <div className='join'>
      <button className={`join-item capitalize text-base tracking-wide btn-ghost btn btn-sm rounded-l-full ${tab === 'recentlyPlayed' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('recentlyPlayed')}>
        {t('spotifyBox.recentlyPlayed')}
      </button>
      <button className={`join-item capitalize text-base tracking-wide btn-ghost btn btn-sm rounded-none ${tab === 'mostPlayed' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('mostPlayed')}>
        {t('spotifyBox.mostPlayed')}
      </button>
      <button className={`join-item  capitalize text-base tracking-wide btn-ghost btn btn-sm  rounded-r-full  ${tab === 'queue' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('queue')}>
        {t('spotifyBox.queue')}
      </button>
    </div>
  );
};

const TimeLeftIndicator = ({ dataRefreshTimer, startDataRefresh }: { dataRefreshTimer: React.MutableRefObject<number>; startDataRefresh: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(dataRefreshTimer.current - new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='flex items-center lg:tooltip' data-tip={`Automatic refresh in ${Math.round(timeLeft / 1000)} seconds`}>
      <button className='btn btn-ghost btn-xs rounded-full' onClick={startDataRefresh}>
        <IoMdRefresh size={20} />
      </button>
    </div>
  );
};

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
  handleFormUpdate(newFormData: RequestDataType, final: boolean): void;
}> = ({ trackData, currentlyPlaying, userCountry, handleFormUpdate }) => {
  const { t } = useTranslation();

  const startSearch = () => {
    const newFormData = {
      country: userCountry || 'DE',
      searchQuery: {
        artist: trackData.artists[0].name,
        title: trackData.name,
        duration: trackData.duration_ms,
      },
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
      <td className='absolute right-0'>
        <button className='btn btn-primary btn-outline btn-xs rounded-full' onClick={startSearch}>
          {t('searchbar.search')}
        </button>
      </td>
    </tr>
  );
};

const SpotifyIntegration = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: RequestDataType, final: boolean) => void }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {isAuthenticated && <SpotifyTable handleFormUpdate={handleFormUpdate} />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

const MemoizedSpotifyIntegration = memo(SpotifyIntegration);
export default MemoizedSpotifyIntegration;
