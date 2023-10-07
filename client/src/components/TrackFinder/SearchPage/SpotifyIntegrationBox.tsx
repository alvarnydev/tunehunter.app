import { useTranslation } from 'react-i18next';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-2'>
      <p>{t('searchbar.spotifyIntegration')}</p>

      <button className='btn btn-xs btn-success rounded-full'>Spotify Integration</button>
    </div>
  );
};

export default SpotifyIntegrationBox;

// bg-black py-2 px-4 rounded-full
