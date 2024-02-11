import axios from 'axios';
import { LogRequestBody } from '../../../globalTypes';

export const logError = ({ error, info }: LogRequestBody) => {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const urlString = `${apiUrl}/log`;

  axios.post(urlString, { error, info }, { timeout: 5_000 });
};
