import { LoadingSpinner } from '../utils/LoadingComponents';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { useEffect, useState } from 'react';
import ErrorAlert from '../utils/ErrorComponents';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa6';

const CallbackPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const code = retrieveFromCallbackUrl();
    const codeVerifier = retrieveFromLocalStorage('codeVerifier');
    const params = buildSearchParams(code, codeVerifier);

    // After the user accepts the authorization request of the previous step, we can exchange the authorization code for an access token.
    const requestAccessToken = async () => {
      try {
        const response = await sendRequest(params);
        const data = await response.json();

        if (ignore === false) {
          setIsLoading(false);
          setError('');
          await saveProperty(data, 'access_token');
          await saveProperty(data, 'refresh_token');

          setTimeout(() => {
            redirect();
          }, 2000);
        }
      } catch (error: unknown) {
        if (ignore === false && error instanceof Error) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    requestAccessToken();

    return () => {
      ignore = true;
    };
  }, []);

  const redirect = () => {
    cleanUpLocalStorage();
    const accessToken = retrieveFromLocalStorage('access_token');
    login(accessToken);
    navigate('/');
  };

  const saveProperty = async (data: any, key: string) => {
    const keyValue = data[key];
    if (keyValue === null || keyValue === '') {
      throw new Error(`No '${key}' found in response!`);
    }

    saveToLocalStorage(key, keyValue);
  };

  const retrieveFromCallbackUrl = (): string => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code === null) {
      throw new Error('No code found in callback URL!');
    }

    return code;
  };

  const retrieveFromLocalStorage = (key: string): string => {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      throw new Error(`No '${key}' found in local storage!`);
    }

    return value;
  };

  const saveToLocalStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
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
      throw new Error('Could not fetch access token!');
    }

    return response;
  };

  const cleanUpLocalStorage = (): void => {
    window.localStorage.removeItem('codeVerifier');
    window.localStorage.removeItem('code');
  };

  if (error) return <ErrorAlert message={error} />;

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

// noCodeFound: 'Error: No code found in callback URL!',
