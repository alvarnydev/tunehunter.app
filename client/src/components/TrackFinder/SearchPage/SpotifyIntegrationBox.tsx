import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();

  return (
    <div className='w-4/5 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
      <p className='pr-2'>{t('spotifyBox.integration')}</p>
      <div className='flex items-center'>
        <button className='btn btn-xs btn-success rounded-full'>Spotify Integration</button>
        <InfoAnnotation infoText={t('spotifyBox.annotation')} />
      </div>
    </div>
  );
};

export default SpotifyIntegrationBox;

// bg-black py-2 px-4 rounded-full
