import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';
import { Track } from '../../../types';
import { MusicPlayingIndicator } from '../../utils/IndicatorComponents';
import { FormDataType, SongTableTab } from '../../../../../types';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SongsTableLayout from './UserSongsTable/SongsTableLayout';
import { IoMdRefresh } from 'react-icons/io';

const SpotifyIntegrationBox = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: FormDataType, final: boolean) => void }) => {
  const { t } = useTranslation();
  const { isAuthenticated, userData, refreshData } = useAuth();
  const [tab, setTab] = useState<SongTableTab>('recentlyPlayed');
  const tableHeight = useRef(208);
  const tableRef = useRef<HTMLDivElement>(null);
  const timerEnd = useRef(new Date().getTime() + 60_000);

  // Refresh data when song is finished or every 60 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    let timer: NodeJS.Timeout;

    const refreshDataOnEndOfSong = async () => {
      if (userData.currentlyPlaying == undefined) return;

      const songDuration = userData.currentlyPlaying.item.duration_ms;
      const songProgress = userData.currentlyPlaying.progress_ms;
      const timeLeft = songDuration - songProgress;

      timerEnd.current = new Date().getTime() + (timeLeft + 500);
      timer = setTimeout(() => {
        startDataRefresh();
      }, timeLeft + 500);
    };

    const refreshDataPeriodically = async (refreshTime: number) => {
      const newTimerEndTime = new Date().getTime() + refreshTime * 1000;
      if (newTimerEndTime < timerEnd.current) timerEnd.current = newTimerEndTime;
      timer = setTimeout(() => {
        startDataRefresh();
      }, refreshTime * 1000);
    };

    // Refresh data when song is finished
    if (userData.currentlyPlaying?.is_playing) {
      refreshDataOnEndOfSong();
    }
    refreshDataPeriodically(60);

    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, userData]);

  const startDataRefresh = () => {
    saveTableHeight();
    refreshData('currentlyAndRecently');
  };

  const saveTableHeight = () => {
    if (tableRef.current == null) return;
    tableHeight.current = tableRef.current.getBoundingClientRect().height;
  };

  const startIntegration = () => {
    storeInLocalStorage('redirect_path', window.location.pathname + window.location.search);
    requestAuthorizationCodePKCE();
  };

  const TrackRow: React.FC<{
    trackData: Track;
    currentlyPlaying?: boolean;
  }> = (
    { trackData, currentlyPlaying } // todo: mark as playing
  ) => {
    const startSearch = () => {
      const newFormData = {
        country: userData.profileData?.country || 'DE',
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

  const SpotifyTable = () => {
    const handleTabUpdate = (newTab: SongTableTab) => {
      saveTableHeight();
      setTab(newTab);
    };

    // Restore table height (tailwind stops evaluating h-[${tableHeight.current}px] correctly after some time, for whatever reason)
    useLayoutEffect(() => {
      if (tableRef.current == null) return;
      tableRef.current.style.height = `${tableHeight.current}px`;
    }, []);

    return (
      <SongsTableLayout loading={userData.recentlyPlayed === null}>
        <>
          <TablePicker tab={tab} handleTabUpdate={handleTabUpdate} />
          <div ref={tableRef} className={`overflow-x-auto scrollbar-none rounded py-2 w-full resize-y h-[${tableHeight.current}px]`}>
            {tab == 'recentlyPlayed' && <RecentlyPlayedTable />}
            {tab == 'mostPlayed' && <MostPlayedTable />}
            {tab == 'queue' && <QueueTable />}
          </div>
        </>
      </SongsTableLayout>
    );
  };

  const TablePicker = ({ tab, handleTabUpdate }: { tab: string; handleTabUpdate: (newTab: SongTableTab) => void }) => {
    return (
      <div className='flex justify-center py-2 mx-[2%] border-b-neutral border-b-[1px]'>
        <div className='w-full flex justify-between items-center'>
          <div>
            <p> {t('spotifyBox.prompt')}</p>
          </div>
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
          <TimeLeftIndicator />
        </div>
      </div>
    );
  };

  const TimeLeftIndicator = () => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(timerEnd.current - new Date().getTime());
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

  const RecentlyPlayedTable = () => {
    if (userData.recentlyPlayed?.items.length == 0)
      return (
        <div className='flex h-full justify-center items-center'>
          <p className='text-center'>You have no recently played songs</p>
        </div>
      );

    return (
      <table className='table table-fixed w-full'>
        <tbody>
          {userData.currentlyPlaying?.is_playing && <TrackRow trackData={userData.currentlyPlaying.item} currentlyPlaying={true} />}
          {userData.recentlyPlayed?.items.map((item) => (
            <TrackRow key={item.played_at} trackData={item.track} />
          ))}
        </tbody>
      </table>
    );
  };

  const QueueTable = () => {
    if (userData.queue?.queue.length == 0)
      return (
        <div className='flex h-full justify-center items-center'>
          <p className='text-center'>Your queue is currently empty</p>
        </div>
      );

    return (
      <table className='table table-fixed w-full'>
        <tbody>
          {userData.queue?.queue.map((item, index) => (
            <TrackRow key={index} trackData={item} />
          ))}
        </tbody>
      </table>
    );
  };

  const MostPlayedTable = () => {
    if (userData.topTracks?.items.length == 0)
      return (
        <div className='flex h-full justify-center items-center'>
          <p className='text-center'>We found no data for your most played songs.</p>
        </div>
      );

    return (
      <table className='table table-fixed w-full'>
        <tbody>
          {userData.topTracks?.items.map((item) => (
            <TrackRow key={item.id} trackData={item} />
          ))}
        </tbody>
      </table>
    );
  };

  const IntegrationText = () => {
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

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {isAuthenticated && <SpotifyTable />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

const MemoizedSpotifyIntegrationBox = memo(SpotifyIntegrationBox);
export default MemoizedSpotifyIntegrationBox;
