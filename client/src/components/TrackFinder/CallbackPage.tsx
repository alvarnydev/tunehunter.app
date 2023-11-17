import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../utils/LoadingComponents';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth';

const CallbackPage = () => {
  const [status, setStatus] = useState('loading');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    processCallback();
  });

  const processCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      setStatus('error.noCodeFound');
      return;
    }

    await requestAccessToken(code);

    if (status.startsWith('Error')) return;

    setStatus('success.redirecting');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.localStorage.removeItem('codeVerifier');
    login();
    navigate('/');
  };

  const requestAccessToken = async (code: string) => {
    const verifier = window.localStorage.getItem('codeVerifier');
    if (!verifier) {
      setStatus('error.noCodeVerifierFound');
      return;
    }

    const params = new URLSearchParams();
    params.append('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
    params.append('code_verifier', verifier);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: params,
    });

    if (!response.ok) {
      setStatus('error.fetchError');
      return;
    }

    const { access_token } = await response.json();
    if (!access_token) {
      setStatus('error.noAccessTokenFound');
      return;
    }

    window.localStorage.setItem('accessToken', access_token);
  };

  return (
    <div className='flex flex-col gap-4'>
      <LoadingSpinner size={24} />
      <p className='ml-2'>{t(`loadingStates.${status}`)}</p>
    </div>
  );
};

export default CallbackPage;
