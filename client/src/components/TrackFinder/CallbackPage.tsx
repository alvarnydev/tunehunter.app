import { LoadingSpinner } from '../utils/LoadingComponents';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { useEffect, useState } from 'react';
import AppAlert, { UserAlert } from '../utils/ErrorComponents';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa6';
import { removeFromLocalStorage, retrieveFromLocalStorage } from '../../utils/localStorage';
import BackButton from './ResultsPage/BackButton';
import { retrieveFromUrl, saveExpiryDate, saveProperty } from '../../utils/utilsFetch';
import { playJingle } from '../../utils/audio';

const initialError = { type: 'app', message: '' };

const CallbackPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    let resParams: URLSearchParams;
    setIsLoading(true);

    // After the user accepts the authorization request of the previous step, we can exchange the authorization code for an access token.
    const requestAccessToken = async () => {
      try {
        const response = await sendRequest(resParams);
        const data = await response.json();

        if (ignore === false) {
          setIsLoading(false);
          setError(initialError);
          await saveProperty(data, 'access_token');
          await saveProperty(data, 'refresh_token');
          await saveExpiryDate(data);

          setTimeout(() => {
            playJingle();
          }, 600);
          setTimeout(() => {
            redirect();
          }, 1500);
        }
      } catch (e: unknown) {
        if (ignore === false && e instanceof Error) {
          setError({ type: 'app', message: e.message });
          setIsLoading(false);
        }
      }
    };

    const redirect = () => {
      cleanUpLocalStorage();
      const accessToken = retrieveFromLocalStorage('access_token');
      login(accessToken);
      navigate('/');
    };

    // Get parameters from URL and build the request
    if (ignore === false) {
      const reqParams = new URLSearchParams(window.location.search);
      if (reqParams.has('error')) {
        setError({ type: 'user', message: t('spotifyBox.denied') });
        setIsLoading(false);
      } else {
        const code = retrieveFromUrl('code');
        const codeVerifier = retrieveFromLocalStorage('codeVerifier');

        resParams = buildSearchParams(code, codeVerifier);
        requestAccessToken();
      }
    }

    return () => {
      ignore = true;
    };
  }, []); // t, login, navigate, error

  const buildSearchParams = (code: string, codeVerifier: string): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
    params.append('code_verifier', codeVerifier);
    return params;
  };

  const sendRequest = async (params: URLSearchParams): Promise<Response> => {
    const url = 'https://accounts.spotify.com/api/token';
    const response = await fetch(url, {
      method: 'POST',
      body: params,
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Error in communication with Spotify API (${data.error}): ${data.error_description}!`);
    }

    return response;
  };

  const cleanUpLocalStorage = (): void => {
    removeFromLocalStorage('codeVerifier');
    removeFromLocalStorage('code');
  };

  if (error.message !== '') {
    return (
      <div className='flex flex-col items-center justify-center gap-[5vh]'>
        {error.type == 'app' && <AppAlert type={'error'} message={error.message} />}
        {error.type == 'user' && <UserAlert type={'warning'} message={error.message} />}
        <BackButton />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 items-center'>
      {isLoading && <LoadingSpinner size={24} />}
      {!isLoading && (
        <>
          <FaCheck size={24} className='text-success' />
          <span>{t('loadingStates.success.redirecting')}</span>
        </>
      )}
    </div>
  );
};

export default CallbackPage;
