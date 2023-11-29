export const storeInLocalStorage = (key: string, value: string): void => {
  if (value === null || value === 'undefined') {
    throw new Error(`No value for '${key}' found!`);
  }
  window.localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const retrieveFromLocalStorage = (key: string): string => {
  const value = window.localStorage.getItem(key);
  if (value === null || value === 'undefined') {
    throw new Error(`No '${key}' found in local storage!`);
  }

  return value;
};
