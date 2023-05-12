import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  english: {
    translation: {
      pricefinder: { artist: 'Artist', song: 'Song', search: 'Search' },
    },
  },
  spanish: {
    translation: {
      pricefinder: { artist: 'Artista', song: 'Canción', search: 'Buscar' },
    },
  },
  german: {
    translation: {
      pricefinder: { artist: 'Künstler', song: 'Lied', search: 'Suchen' },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
