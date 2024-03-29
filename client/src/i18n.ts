import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  english: {
    translation: {
      status: 'Currently in development so some things may not work as expected.',
      searchbar: {
        artist: 'Artist',
        song: 'Song',
        search: 'Search',
        modeSearch: 'Search',
      },
      spotify: {
        integration: 'For the best results, use our ',
        recentlyPlayed: 'Your recently played songs on Spotify',
        annotation: "After logging in you'll see your recently played songs and can search for them directly. (Not functional for users not added to Spotify's developer dashboard during development phase)",
        authenticated: 'Press play on any song (in Spotify) and we will try to find it!',
        denied: "You did not grant us access! While we can't use your Spotify data this way, you can still use the normal search function.",
      },
      spotifyBox: {
        prompt: 'Get your songs from: ',
        recentlyPlayed: 'Recently Played',
        mostPlayed: 'Most Played',
        queue: 'Queue',
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
      },
      trackpreview: {
        selectedsong: 'Current choice',
        selectsong: 'Select',
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
        missingSongInput: 'Please enter both artist and a song.',
        moreInformation: 'This is what happened: ',
        noSong: 'We could not find the song! Please check your input.',
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
      status: 'Actualmente en desarrollo, por lo que algunas cosas pueden no funcionar como se espera.',
      searchbar: {
        artist: 'Artista',
        song: 'Canción',
        search: 'Buscar',
        modeSearch: 'Búsqueda',
      },
      spotify: {
        integration: 'Para los mejores resultados, usa nuestra ',
        recentlyPlayed: 'Tus canciones recientes en Spotify',
        annotation: 'Después de iniciar sesión, verás tus canciones recientes y podrás buscarlas directamente. (No funcional para usuarios que no hayan sido añadidos al panel de desarrolladores de Spotify durante la fase de desarrollo)',
        authenticated: 'Pulsa play en cualquier canción (en Spotify) y intentaremos encontrarla!',
        denied: 'No nos has dado acceso! Aunque no podemos usar tus datos de Spotify de esta manera, puedes seguir usando la búsqueda normal.',
      },
      spotifyBox: {
        prompt: 'Obtén tus canciones de: ',
        recentlyPlayed: 'Recientes',
        mostPlayed: 'Más escuchadas',
        queue: 'Cola',
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
      },
      trackpreview: {
        selectedsong: 'Elección actual',
        selectsong: 'Seleccionar',
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
        missingSongInput: 'Por favor, introduce tanto el artista como la canción.',
        moreInformation: 'Esto es lo que ha pasado: ',
        noSong: 'No hemos podido encontrar la canción! Por favor, comprueba tu entrada.',
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
      status: 'Aktuell in Entwicklung, daher funktionieren einige Dinge eventuell nicht wie erwartet.',
      searchbar: {
        artist: 'Künstler',
        song: 'Lied',
        search: 'Suchen',
        modeSearch: 'Suche',
      },
      spotify: {
        integration: "Für die besten Ergebnisse, nutz' unsere ",
        recentlyPlayed: 'Deine zuletzt gehörten Lieder auf Spotify',
        annotation: 'Nach dem Einloggen siehst du deine zuletzt gehörten Lieder und kannst direkt danach suchen. (Nicht funktional für Nutzer, die während der Entwicklungsphase nicht zu Spotifys Entwicklerdashboard hinzugefügt wurden)',
        authenticated: 'Starte irgendein Lied (in Spotify) und wir suchen danach automatisch!',
        denied: 'Du hast uns keinen Zugriff gewährt! Auch wenn wir deine Spotifydaten so nicht verwenden können, kannst du trotzdem die normale Suche verwenden.',
      },
      spotifyBox: {
        prompt: 'Hol dir deine Lieder von: ',
        recentlyPlayed: 'Zuletzt gehört',
        mostPlayed: 'Meistgehört',
        queue: 'Warteschlange',
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
      },
      trackpreview: {
        selectedsong: 'Aktuelle Auswahl',
        selectsong: 'Auswählen',
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
        missingSongInput: "Bitte gib' sowohl KünstlerIn als auch das Lied ein.",
        moreInformation: 'Das ist passiert: ',
        noSong: 'Wir konnten das Lied nicht finden! Bitte überprüfe deine Eingabe.',
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
