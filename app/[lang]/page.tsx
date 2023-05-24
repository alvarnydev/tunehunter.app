'use client';
import { LanguageType } from '../../i18n-config';
import TrackFinder from './components/TrackFinder';
import { LanguageContext } from '@/context/LanguageContext';
import ResultsTable from './components/ResultsTable';

export default async function Home({ params: { lang } }: { params: { lang: LanguageType } }) {
  return (
    <LanguageContext.Provider value={lang}>
      <TrackFinder>
        <ResultsTable />
      </TrackFinder>
    </LanguageContext.Provider>
  );
}
