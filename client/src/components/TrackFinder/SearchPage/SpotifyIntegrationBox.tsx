import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';
import { Track } from '../../../types';
import { useNavigate } from 'react-router';
import { LoadingSpinner } from '../../utils/LoadingComponents';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userData } = useAuth();
  const navigate = useNavigate();

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
      const params = `?type=song&country=DE&artist=${trackData.artists[0].name}&title=${trackData.name}&duration=${trackData.duration_ms}`;
      navigate(`/results${params}`);
    };

    return (
      <tr className='[&>td]:border-0 relative [&>td]:rounded-none'>
        <td>
          <div className='flex items-center gap-3'>
            <div className='avatar pr-2'>
              <div className='mask mask-squircle w-10 h-10'>
                <img src={trackData.album.images[0].url} alt='Avatar Tailwind CSS Component' />
              </div>
            </div>
            <div>
              <div className={`${currentlyPlaying ? 'font-bold' : ''}`}>{trackData.artists[0].name}</div>
              <div className='text-sm opacity-50'>{trackData.artists[1]?.name}</div>
            </div>
          </div>
        </td>
        <td>
          <div className=''>{trackData.name.substring(0, 50)}</div>
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
      <div className={`overflow-x-auto w-full h-60 rounded-xl shadow shadow-info bg-info ${userData.isLoading ? 'flex justify-center items-center' : ''} pl-2 `}>
        {userData.isLoading && <LoadingSpinner size={40} />}
        {!userData.isLoading && (
          <table className='table table-fixed '>
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
      <div className='flex flex-col items-center justify-center gap-2'>
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
    <div className='flex flex-col items-center justify-center'>
      {isAuthenticated && <RecentlyPlayedBox />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

export default SpotifyIntegrationBox;
