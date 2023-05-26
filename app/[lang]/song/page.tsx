import ResultsTable from '@/components/ResultsTable';
import { getDictionary } from '../../../dictionaries';
import { LangType } from '../../../i18n-config';
import BackButton from '@/components/BackButton';

export default async function Home({ params: { lang } }: { params: { lang: LangType } }) {
  const dict = await getDictionary(lang);

  <>
    <BackButton />
    <ResultsTable dictResultsTable={dict.resultstable} />
  </>;
}
