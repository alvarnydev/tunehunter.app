import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';
import { Track } from '../../../types';
import { LoadingIndicator, MusicPlayingIndicator } from '../../utils/IndicatorComponents';
import { FormDataType, SongTableTab } from '../../../../../types';
import { memo, useEffect, useRef, useState } from 'react';
import SongsTableLayout from './UserSongsTable/SongsTableLayout';

const SpotifyIntegrationBox = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: FormDataType, final: boolean) => void }) => {
  const { t } = useTranslation();
  const { isAuthenticated, userData, refreshData } = useAuth();
  const setRefresh = useRef(false);
  console.log('rerender', setRefresh.current);
  console.log(userData);

  // Refresh data when song is finished
  useEffect(() => {
    const getUpdatedPlayingData = async () => {
      if (userData.currentlyPlaying == undefined) return;
      setRefresh.current = true;

      const songDuration = userData.currentlyPlaying.item.duration_ms;
      const songProgress = userData.currentlyPlaying.progress_ms;
      const timeLeft = songDuration - songProgress;
      console.log(timeLeft);

      setTimeout(() => {
        refreshData('currentlyAndRecently');
        setRefresh.current = false;
      }, timeLeft + 500);
    };

    if (isAuthenticated && userData.currentlyPlaying?.is_playing && !setRefresh.current) {
      getUpdatedPlayingData();
    }
  }, [isAuthenticated, userData.currentlyPlaying]);

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

  const UserSongsTable = () => {
    const [tab, setTab] = useState<SongTableTab>('recentlyPlayed');
    const divRef = useRef<HTMLDivElement>(null);
    userData.isLoading = false;

    const handleTabUpdate = (newTab: SongTableTab) => {
      setTab(newTab);
    };

    return (
      <SongsTableLayout loading={userData.isLoading}>
        <>
          <TablePicker tab={tab} handleTabUpdate={handleTabUpdate} />
          <div ref={divRef} className={`overflow-x-auto scrollbar-none rounded py-2 resize-y h-52`}>
            {userData.isLoading && <LoadingIndicator size={40} />}
            {!userData.isLoading && (
              <>
                {tab == 'recentlyPlayed' && <RecentlyPlayedTable />}
                {tab == 'mostPlayed' && <MostPlayedTable />}
                {tab == 'queue' && <QueueTable />}
              </>
            )}
          </div>
        </>
      </SongsTableLayout>
    );
  };

  const TablePicker = ({ tab, handleTabUpdate }: { tab: string; handleTabUpdate: (newTab: SongTableTab) => void }) => {
    return (
      <div className='flex justify-center py-2 mx-[2%] border-b-neutral border-b-[1px]'>
        <div className='w-[90%] flex justify-between'>
          <div>
            <p>Get your songs from:</p>
          </div>
          <div className='join'>
            <button className={`join-item capitalize text-base tracking-wide btn-ghost btn btn-sm rounded-l-full ${tab === 'recentlyPlayed' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('recentlyPlayed')}>
              Recently Played
            </button>
            <button className={`join-item capitalize text-base tracking-wide btn-ghost btn btn-sm rounded-none ${tab === 'mostPlayed' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('mostPlayed')}>
              Most Played
            </button>
            <button className={`join-item  capitalize text-base tracking-wide btn-ghost btn btn-sm  rounded-r-full  ${tab === 'queue' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('queue')}>
              Queue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RecentlyPlayedTable = () => {
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
          {userData.queue?.queue.map((item) => (
            <TrackRow key={item.uri} trackData={item} />
          ))}
        </tbody>
      </table>
    );
  };

  const MostPlayedTable = () => {
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
      {isAuthenticated && <UserSongsTable />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

const MemoizedSpotifyIntegrationBox = memo(SpotifyIntegrationBox);
export default MemoizedSpotifyIntegrationBox;
