import { getDictionary } from '../../dictionaries';
import { Language } from '../../i18n-config';
import TrackFinder from './components/TrackFinder';

export default async function Home({ params: { lang } }: { params: { lang: Language } }) {
  const dict = await getDictionary(lang);

  return <TrackFinder />;
}
