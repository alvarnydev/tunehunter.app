import { LoadingSpinner } from '../utils/LoadingComponents';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { useEffect, useState } from 'react';
import AppAlert, { UserAlert } from '../utils/ErrorComponents';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa6';
import { removeFromLocalStorage, retrieveFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import BackButton from './ResultsPage/BackButton';

const initialError = { type: 'app', message: '' };

const CallbackPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    let code;
    let codeVerifier;
    let params: URLSearchParams;

    try {
      code = retrieveFromUrl('code');
      codeVerifier = retrieveFromLocalStorage('codeVerifier');
      params = buildSearchParams(code, codeVerifier);
    } catch (error) {
      setError({ type: 'user', message: t('spotifyBox.denied') });
    }

    // After the user accepts the authorization request of the previous step, we can exchange the authorization code for an access token.
    const requestAccessToken = async () => {
      try {
        const response = await sendRequest(params);
        const data = await response.json();

        if (ignore === false) {
          setIsLoading(false);
          setError(initialError);
          await saveProperty(data, 'access_token');
          await saveProperty(data, 'refresh_token');
          await saveExpiryDate(data, 'expires_in');

          setTimeout(() => {
            redirect();
          }, 2000);
        }
      } catch (error: unknown) {
        if (ignore === false && error instanceof Error) {
          setError({ type: 'app', message: error.message });
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

    if (error.message === '') requestAccessToken();

    return () => {
      ignore = true;
    };
  }, [login, navigate, error]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveProperty = async (data: any, key: string) => {
    const keyValue = data[key];
    if (keyValue === null || keyValue === '') {
      throw new Error(`No '${key}' found in response!`);
    }

    saveToLocalStorage(key, keyValue);
  };

  const saveExpiryDate = async (data: any, key: string) => {
    const expiresIn = data[key];
    const currentDate = new Date();
    saveToLocalStorage('issue_date', currentDate.toISOString());
    currentDate.setSeconds(currentDate.getSeconds() + expiresIn);
    saveToLocalStorage('expiry_date', currentDate.toISOString());
  };

  const retrieveFromUrl = (parameter: string): string => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get(parameter);
    if (code === null) {
      throw new Error(`No '${parameter}' found in callback URL!`);
    }

    return code;
  };

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
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: params,
    });
    if (!response.ok || response === null) {
      throw new Error('Error while sending request!');
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
