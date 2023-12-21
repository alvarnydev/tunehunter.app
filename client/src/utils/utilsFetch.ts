import { storeInLocalStorage } from '@/utils/localStorage';

export const saveExpiryDate = async (data: any) => {
  const expiresIn = data['expires_in'];
  const currentDate = new Date();
  storeInLocalStorage('issue_date', currentDate.toISOString());
  currentDate.setSeconds(currentDate.getSeconds() + expiresIn);
  storeInLocalStorage('expiry_date', currentDate.toISOString());
};

export const retrieveFromUrl = (parameter: string): string => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get(parameter);
  if (code === null) {
    throw new Error(`No '${parameter}' found in URL!`);
  }

  return code;
};

export const saveProperty = async (data: any, key: string) => {
  const keyValue = data[key];
  if (keyValue === null || keyValue === '') {
    throw new Error(`No '${key}' found in response!`);
  }

  storeInLocalStorage(key, keyValue);
};
