import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  english: {
    translation: {
      searchbar: { artist: 'Artist', song: 'Song', search: 'Search' },
      resultstable: {
        header: {
          store: 'Music store',
          quality: 'Quality',
          price: 'Price',
          artistsshare: "Artist's share",
          link: 'Link',
        },
        buy: 'Buy',
      },
    },
  },
  spanish: {
    translation: {
      searchbar: { artist: 'Artista', song: 'Canción', search: 'Buscar' },
      resultstable: {
        header: {
          store: 'Tienda de música',
          quality: 'Calidad',
          price: 'Precio',
          artistsshare: 'Corte del artista',
          link: 'Link',
        },
        buy: 'Comprar',
      },
    },
  },
  german: {
    translation: {
      searchbar: { artist: 'Künstler', song: 'Lied', search: 'Suchen' },
      resultstable: {
        header: {
          store: 'Plattform',
          quality: 'Qualität',
          price: 'Preis',
          artistsshare: 'Künstleranteil',
          link: 'Link',
        },
        buy: 'Kaufen',
      },
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
