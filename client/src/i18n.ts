import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  english: {
    translation: {
      searchbar: {
        artist: 'Artist',
        song: 'Song',
        search: 'Search',
        spotifyIntegration: 'For best results use our ',
      },
      resultstable: {
        header: {
          store: 'Music store',
          quality: 'Quality',
          price: 'Price',
          artistsshare: "Artist's share",
          link: 'Link',
        },
        buy: 'Buy',
        backtostart: 'Back to the start',
        wrongsong: 'Not the right song?',
      },
      countries: {
        de: 'Germany',
      },
    },
  },
  spanish: {
    translation: {
      searchbar: {
        artist: 'Artista',
        song: 'Canción',
        search: 'Buscar',
        spotifyIntegration: 'Para mejores resultados, use nuestra ',
      },
      resultstable: {
        header: {
          store: 'Tienda',
          quality: 'Calidad',
          price: 'Precio',
          artistsshare: 'Corte del artista',
          link: 'Link',
        },
        buy: 'Comprar',
        backtostart: 'Volver al principio',
        wrongsong: '¿No la canción correcta?',
      },
      countries: {
        de: 'Alemania',
      },
    },
  },
  german: {
    translation: {
      searchbar: {
        artist: 'Künstler',
        song: 'Lied',
        search: 'Suchen',
        spotifyIntegration: "Für das beste Ergebnis nutz' unsere ",
      },
      resultstable: {
        header: {
          store: 'Plattform',
          quality: 'Qualität',
          price: 'Preis',
          artistsshare: 'Künstleranteil',
          link: 'Link',
        },
        buy: 'Kaufen',
        backtostart: 'Zurück zum Start',
        wrongsong: 'Nicht das richtige Lied?',
      },
      countries: {
        de: 'Deutschland',
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
