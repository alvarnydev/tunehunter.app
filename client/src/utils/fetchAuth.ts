const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';
const SCOPE = 'user-read-currently-playing';

export const requestAuthorizationCodePKCE = async () => {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem('codeVerifier', codeVerifier);
  const hashed = await hashStringWithSha256(codeVerifier);
  const codeChallenge = encodeWithBase64Url(hashed);
  redirectToSpotify(codeChallenge);
};

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

const redirectToSpotify = (codeChallenge: string) => {
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

export const refreshToken = async () => {
  const refreshToken = window.localStorage.getItem('refresh_token');
  const params = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const url = new URL('https://accounts.spotify.com/api/token');
  //url.search = new URLSearchParams(params).toString();

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${import.meta.env.VITE_SPOTIFY_AUTHORIZATION}`,
    },
  });

  const data = await response.json();
  const newAccessToken = data.access_token;
  window.localStorage.setItem('access_token', newAccessToken);
};
