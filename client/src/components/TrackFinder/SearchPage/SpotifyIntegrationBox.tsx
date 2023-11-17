import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';

const SpotifyIntegrationBox = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'code';
  const SCOPE = 'user-read-currently-playing';

  const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  const hashStringWithSha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  const encodeWithBase64Url = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const requestAuthorizationCodePKCE = async () => {
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem('codeVerifier', codeVerifier);
    const hashed = await hashStringWithSha256(codeVerifier);
    const codeChallenge = encodeWithBase64Url(hashed);

    const params = {
      client_id: CLIENT_ID,
      response_type: RESPONSE_TYPE,
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope: SCOPE,
    };

    const url = new URL(AUTH_ENDPOINT);
    url.search = new URLSearchParams(params).toString();
    window.location.href = url.toString();
  };

  return (
    <div className='w-4/5 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
      <p className='pr-2'>{isAuthenticated ? t('spotifyBox.authorized') : t('spotifyBox.integration')}</p>
      {!isAuthenticated && (
        <div className='flex items-center'>
          <button className='btn btn-xs btn-success rounded-full' onClick={requestAuthorizationCodePKCE}>
            Spotify Integration
          </button>
          <InfoAnnotation infoText={t('spotifyBox.annotation')} />
        </div>
      )}
    </div>
  );
};

export default SpotifyIntegrationBox;
