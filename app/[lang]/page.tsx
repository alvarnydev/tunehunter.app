'use client';
import { LangType } from '../../i18n-config';
import TrackFinder from './components/TrackFinder';
import ResultsTable from './components/ResultsTable';
import { getDictionary } from '../../dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: LangType } }) {
  const dict = await getDictionary(lang);

  return (
    <TrackFinder dictTrackFinder={dict.searchbar}>
      <ResultsTable dictResultsTable={dict.resultstable} />
    </TrackFinder>
  );
}
