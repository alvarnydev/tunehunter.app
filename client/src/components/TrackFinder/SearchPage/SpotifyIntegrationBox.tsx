import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userData } = useAuth();

  const handleClick = () => {
    storeInLocalStorage('redirect_path', window.location.pathname + window.location.search);
    requestAuthorizationCodePKCE();
  };

  const RecentlyPlayed = () => {
    return <div></div>;
  };

  const HintText = () => {
    return (
      <div className='flex justify-center'>
        <p className='text-base-content/60 italic'>{t('spotifyBox.authenticated')}</p>
      </div>
    );
  };

  const IntegrationText = () => {
    return (
      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
        <p className='pr-2'>{t('spotifyBox.integration')}</p>
        <div className='flex items-center'>
          <button className='btn btn-xs btn-success rounded-full' onClick={handleClick}>
            Spotify Integration
          </button>
          <InfoAnnotation infoText={t('spotifyBox.annotation')} />
        </div>
      </div>
    );
  };

  return (
    <div className='w-4/5 flex flex-col gap-[2vh] items-center justify-center'>
      {isAuthenticated && (
        <>
          <RecentlyPlayed />
          <HintText />
        </>
      )}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

export default SpotifyIntegrationBox;
