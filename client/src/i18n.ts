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
        authenticated: 'Detecting your song',
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
        moreInformation: "In case you're curious, this is the error: ",
        reachOut: 'While the error already made its way over to me, feel free to reach out to me at XXX :)',
      },
      loadingStates: {
        loading: 'Loading...',
        error: {
          noCodeVerifierFound: 'Error: No code verifier found in local storage!',
          noCodeFound: 'Error: No code found in callback URL!',
          fetchError: 'Error: Could not fetch access token!',
          noTokenFound: 'Error: No token found in response!',
        },
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
        authenticated: 'Detectando tu canción',
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
        moreInformation: 'En caso de que estés curioso, este es el error: ',
        reachOut: 'Aunque el error ya me ha llegado, no dudes en contactarme en XXX :)',
      },
      loadingStates: {
        loading: 'Cargando...',
        error: {
          noCodeVerifierFound: 'Error: No code verifier found in local storage!',
          noCodeFound: 'Error: No code found in callback URL!',
          fetchError: 'Error: Could not fetch access token!',
          noTokenFound: 'Error: No token found in response!',
        },
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
        authenticated: 'Versuche, dein Lied herauszufinden',
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
        moreInformation: 'Falls du neugierig bist, das ist der Fehler: ',
        reachOut: 'Auch wenn der Fehler schon bei mir angekommen ist, kannst du mich gerne unter XXX kontaktieren :)',
      },
      loadingStates: {
        loading: 'Laden...',
        error: {
          noCodeVerifierFound: 'Error: No code verifier found in local storage!',
          noCodeFound: 'Error: No code found in callback URL!',
          fetchError: 'Error: Could not fetch access token!',
          noTokenFound: 'Error: No token found in response!',
        },
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
