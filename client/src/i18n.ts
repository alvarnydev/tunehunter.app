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
      },
      spotifyBox: {
        integration: 'For best results, use our ',
        annotation:
          "After logging in, just hit play on the song you want to search for and we'll automatically search for it!",
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
      },
      spotifyBox: {
        integration: 'Para mejores resultados, use nuestra ',
        annotation:
          'Después de iniciar sesión, simplemente reproduce la canción que deseas buscar y la buscaremos automáticamente!',
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
        spotifyIntegration: '',
      },
      spotifyBox: {
        integration: "Für die besten Ergebnisse, nutz' unsere ",
        annotation:
          'Starte nach dem Einloggen einfach das Lied, das du suchst und wir suchen es automatisch heraus!',
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
