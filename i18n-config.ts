export const i18n = {
  defaultLanguage: 'en',
  languages: ['en', 'de', 'es'],
  languageDetection: false,
} as const;

export type Language = (typeof i18n)['languages'][number];
