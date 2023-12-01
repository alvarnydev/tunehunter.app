import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';
import { Track } from '../../../types';
import { LoadingIndicator, MusicPlayingIndicator } from '../../utils/IndicatorComponents';
import { FormDataType } from '../../../../../types';
import { useEffect, useRef } from 'react';

const SpotifyIntegrationBox = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: FormDataType, final: boolean) => void }) => {
  const { t } = useTranslation();
  const { isAuthenticated, userData, refreshData } = useAuth();
  const readyForRefresh = useRef(true);

  useEffect(() => {
    readyForRefresh.current = true;

    const getUpdatedPlayingData = async () => {
      if (userData.currentlyPlaying == undefined) return;

      const songDuration = userData.currentlyPlaying.item.duration_ms;
      const songProgress = userData.currentlyPlaying.progress_ms;
      const timeLeft = songDuration - songProgress;

      setTimeout(() => {
        refreshData('queue');
        refreshData('currentlyPlaying');
        readyForRefresh.current = false;
      }, timeLeft + 500);
    };

    if (isAuthenticated && readyForRefresh.current) {
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
            <div className='inline'>{trackData.name.substring(0, 50)}</div>
          </div>
        </td>
        <td className='absolute right-0 top-2'>
          <button className='btn btn-info btn-outline btn-xs rounded-full' onClick={startSearch}>
            {t('searchbar.search')}
          </button>
        </td>
      </tr>
    );
  };

  const RecentlyPlayedTable = () => {
    return (
      <div className={`overflow-x-auto w-full h-60 rounded-xl shadow shadow-info ${userData.isLoading ? 'flex justify-center items-center' : ''} pl-2 `}>
        {userData.isLoading && <LoadingIndicator size={40} />}
        {!userData.isLoading && (
          <table className='table table-fixed w-full'>
            <tbody>
              {userData.currentlyPlaying && <TrackRow trackData={userData.currentlyPlaying.item} currentlyPlaying={true} />}
              {userData.recentlyPlayed?.items.map((item) => (
                <TrackRow key={item.played_at} trackData={item.track} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const RecentlyPlayedBox = () => {
    return (
      <div className='w-3/4 flex flex-col items-center justify-center gap-2'>
        <RecentlyPlayedTable />
        <div className='text-sm italic text-info'>{t('spotify.recentlyPlayed')}</div>
      </div>
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
      {isAuthenticated && <RecentlyPlayedBox />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

export default SpotifyIntegrationBox;
