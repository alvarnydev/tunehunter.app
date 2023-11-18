import { LoadingSpinner } from '../utils/LoadingComponents';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { useEffect, useState } from 'react';
import ErrorAlert from '../utils/ErrorComponents';
import { useTranslation } from 'react-i18next';

const CallbackPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    const requestAccessToken = async () => {
      try {
        const verifier = getCodeVerifier();
        const params = buildSearchParams(verifier);
        const response = await sendRequest(params);
        const accessToken = await extractAccessToken(response);
        saveAccessToken(accessToken);

        if (ignore === false) {
          setIsLoading(false);
          setError('success.redirecting');

          setTimeout(() => {
            redirect(accessToken);
          }, 2000);
        }
      } catch (error: unknown) {
        if (ignore === false) {
          if (error instanceof Error) {
            setError(error.message);
          }
        }
      }
    };

    requestAccessToken();

    return () => {
      ignore = true;
    };
  }, []);

  const getCodeVerifier = (): string => {
    const codeVerifier = window.localStorage.getItem('codeVerifier');
    if (codeVerifier === null) {
      throw new Error('error.noCodeVerifierFound');
    }

    return codeVerifier;
  };

  const buildSearchParams = (verifier: string): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    params.append('response_type', 'code');
    params.append('redirect_uri', import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', verifier);
    return params;
  };

  const sendRequest = async (params: URLSearchParams): Promise<Response> => {
    const response = await fetch('https://accounts.spotify.com/authorize', {
      method: 'POST',
      body: params,
    });
    if (!response.ok || response === null) {
      throw new Error('error.fetchError');
    }

    return response;
  };

  const extractAccessToken = async (response: Response): Promise<string> => {
    const { accessToken } = await response.json();
    if (accessToken === '' || accessToken === null) {
      throw new Error('error.noAccessTokenFound');
    }

    return accessToken;
  };

  const saveAccessToken = (accessToken: string) => {
    window.localStorage.setItem('accessToken', accessToken);
  };

  const redirect = (accessToken: string) => {
    cleanUpLocalStorage();
    login(accessToken);
    navigate('/');
  };

  const cleanUpLocalStorage = (): void => {
    window.localStorage.removeItem('codeVerifier');
    window.localStorage.removeItem('code');
  };

  return (
    <div className='flex flex-col gap-4'>
      {isLoading && <LoadingSpinner size={24} />}
      <p className='ml-2'>{t(`loadingStates.${error}`)}</p>
      {error && ErrorAlert({ message: error })}
    </div>
  );
};

export default CallbackPage;
