import type { LangType } from './i18n-config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (lang: LangType) => dictionaries[lang]();
