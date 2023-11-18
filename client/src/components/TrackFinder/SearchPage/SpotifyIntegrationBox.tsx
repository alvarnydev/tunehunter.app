import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchAUth';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userData } = useAuth();

  const Dashboard = () => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-center'>
          <p className='text-base-content/60'>{t('spotifyBox.authenticated')}</p>
        </div>
        <div className='stats shadow overflow-hidden'>
          <div className='stat py-2'>
            <div className='stat-figure text-primary'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'></path>
              </svg>
            </div>
            <div className='tooltip tooltip-bottom' data-tip={t('footer.profileDisabledTooltip')}>
              <div className='stat-title'>Total Likes</div>
              <div className='stat-value text-primary flex justify-start'>{userData.spotify.totalLikes}K</div>
            </div>
          </div>

          <div className='stat  py-2'>
            <div className='stat-figure text-secondary'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
              </svg>
            </div>
            <div className='tooltip tooltip-bottom' data-tip={t('footer.profileDisabledTooltip')}>
              <div className='stat-title'>Total Songs</div>
              <div className='stat-value text-secondary flex justify-start'>{userData.spotify.totalSongs}M</div>
            </div>
          </div>

          <div className='stat py-2'>
            <div className='stat-figure text-secondary'>
              <div className='avatar'>
                <div className='w-16 rounded-full'>
                  <img src={userData.imagePath} />
                </div>
              </div>
            </div>
            <div className='tooltip tooltip-bottom' data-tip={t('footer.profileDisabledTooltip')}>
              <div className='stat-value flex justify-start'>{userData.spotify.searches}</div>
              <div className='stat-title'>Searches</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IntegrationText = () => {
    return (
      <>
        <p className='pr-2'>{t('spotifyBox.integration')}</p>
        <div className='flex items-center'>
          <button className='btn btn-xs btn-success rounded-full' onClick={requestAuthorizationCodePKCE}>
            Spotify Integration
          </button>
          <InfoAnnotation infoText={t('spotifyBox.annotation')} />
        </div>
      </>
    );
  };

  return (
    <div className='w-4/5 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
      {isAuthenticated && <Dashboard />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

export default SpotifyIntegrationBox;
