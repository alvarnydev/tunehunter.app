import axios from 'axios';
import { LogRequestBody } from '../../../globalTypes';

export const logError = ({ error, info }: LogRequestBody) => {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const apiKey = import.meta.env.VITE_API_KEY || '';
  const urlString = `${apiUrl}/log`;

  axios.post(urlString, { error, info }, { headers: { 'X-API-KEY': apiKey }, timeout: 5_000 });
};
