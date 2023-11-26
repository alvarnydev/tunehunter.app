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
        annotation: "After logging in, just hit play on the song you want to search for and we'll automatically search for it!",
        authenticated: 'Just press play on any song (in Spotify) and we will try to find it!',
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
      footer: {
        profileDisabledTooltip: 'To access your profile, log in with Spotify',
      },
      countries: {
        de: 'Germany',
      },
      errors: {
        general: "Something bad happened on our end, sorry! We're investigating...",
        moreInformation: 'This is what happened: ',
        reachOut: 'The error already made its way over to us but feel free to reach out anyway at XXX.',
      },
      loadingStates: {
        loading: 'Loading...',
        success: {
          general: 'Success!',
          redirecting: 'Success! Redirecting...',
        },
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
        annotation: 'Después de iniciar sesión, simplemente reproduce la canción que deseas buscar y la buscaremos automáticamente!',
        authenticated: 'Sólo pulsa play en cualquier canción (en Spotify) y intentaremos encontrarla!',
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
      footer: {
        profileDisabledTooltip: 'Para acceder a tu perfil, inicia sesión con Spotify',
      },
      countries: {
        de: 'Alemania',
      },
      errors: {
        general: 'Nos ha pasado algo, ¡lo sentimos! Estamos investigando...',
        moreInformation: 'Esto es lo que ha pasado: ',
        reachOut: 'Aunque el error ya nos ha llegado, no dudes en contactarnos en XXX.',
      },
      loadingStates: {
        loading: 'Cargando...',
        success: {
          general: 'Éxito!',
          redirecting: 'Éxito! Redirigiendo...',
        },
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
        annotation: 'Starte nach dem Einloggen einfach das Lied, das du suchst und wir suchen es automatisch heraus!',
        authenticated: 'Starte irgendein ein Lied (in Spotify) und wir suchen automatisch danach!',
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
      footer: {
        profileDisabledTooltip: "Um auf dein Profil zuzugreifen, log' dich mit Spotify ein",
      },
      countries: {
        de: 'Deutschland',
      },
      errors: {
        general: 'Etwas ist schief gelaufen, sorry! Wir begeben uns auf Fehlersuche...',
        moreInformation: 'Das ist passiert: ',
        reachOut: 'Der Fehler hat auch schon seinen Weg zu uns gefunden, aber du kannst uns trotzdem gerne unter XXX kontaktieren.',
      },
      loadingStates: {
        loading: 'Laden...',
        success: {
          general: 'Erfolg!',
          redirecting: 'Erfolg! Leite weiter...',
        },
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
