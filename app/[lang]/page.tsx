'use client';
import { LanguageType } from '../../i18n-config';
import TrackFinder from './components/TrackFinder';
import ResultsTable from './components/ResultsTable';
import { getDictionary } from '../../dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: LanguageType } }) {
  const dict = await getDictionary(lang);

  return (
    <TrackFinder dictTrackFinder={dict.searchbar}>
      <ResultsTable dictResultsTable={dict.resultstable} />
    </TrackFinder>
  );
}
