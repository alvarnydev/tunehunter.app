'use client';
import { LangType } from '../../i18n-config';
import TrackFinderForm from './components/TrackFinderForm';
import ResultsTable from './components/ResultsTable';
import { getDictionary } from '../../dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: LangType } }) {
  const dict = await getDictionary(lang);

  return (
    <TrackFinderForm dictTrackFinder={dict.searchbar}>
      <ResultsTable dictResultsTable={dict.resultstable} />
    </TrackFinderForm>
  );
}
