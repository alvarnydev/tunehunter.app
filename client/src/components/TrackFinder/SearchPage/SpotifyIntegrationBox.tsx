import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userData } = useAuth();

  const startIntegration = () => {
    storeInLocalStorage('redirect_path', window.location.pathname + window.location.search);
    requestAuthorizationCodePKCE();
  };

  const startSearch = () => {
    console.log('start search');
  };

  const RecentlyPlayed = () => {
    return (
      <div className='overflow-x-auto max-h-52 rounded-xl'>
        <table className='table '>
          <tbody>
            {userData.currentlyPlaying && (
              // todo: mark as playing
              <tr>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-10 h-10'>
                        <img src={userData.currentlyPlaying.item.album.images[0].url} alt='Avatar Tailwind CSS Component' />
                      </div>
                    </div>
                    <div>
                      <div className=''>{userData.currentlyPlaying.item.artists[0].name}</div>
                      <div className='text-sm opacity-50'>{userData.currentlyPlaying.item.artists[1]?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className=''>{userData.currentlyPlaying.item.name}</div>
                </td>
                <th>
                  <button className='btn btn-info btn-outline btn-xs rounded-full'>Search</button>
                </th>
              </tr>
            )}
            {userData.recentlyPlayed?.items.map((item) => {
              return (
                <tr>
                  <td>
                    <div className='flex items-center gap-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-10 h-10'>
                          <img src={item.track.album.images[0].url} alt='Avatar Tailwind CSS Component' />
                        </div>
                      </div>
                      <div>
                        <div className=''>{item.track.artists[0].name}</div>
                        <div className='text-sm opacity-50'>{item.track.artists[1]?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className=''>{item.track.name}</div>
                  </td>
                  <th>
                    <button className='btn btn-info btn-outline btn-xs rounded-full' onClick={startSearch}>
                      Search
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const IntegrationText = () => {
    return (
      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
        <p className='pr-2'>{t('spotifyBox.integration')}</p>
        <div className='flex items-center'>
          <button className='btn btn-xs btn-success rounded-full' onClick={startIntegration}>
            Spotify Integration
          </button>
          <InfoAnnotation infoText={t('spotifyBox.annotation')} />
        </div>
      </div>
    );
  };

  return (
    <div className='w-4/5 flex flex-col items-center justify-center'>
      {isAuthenticated && <RecentlyPlayed />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

export default SpotifyIntegrationBox;
