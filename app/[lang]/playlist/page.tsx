import ResultsTable from '@/components/ResultsTable';
import { getDictionary } from '../../../dictionaries';
import { LangType } from '../../../i18n-config';
import BackButton from '@/components/BackButton';

// async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//   event.preventDefault();

//   const songUrl = `/api/song?title=${songSearchQuery.title}&artist=${songSearchQuery.artist}`;
//   const playlistUrl = `/api/playlist?url=${playlistSearchString}`;
//   const headers = {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   };

//   if (searchMode === 'song') {
//     await fetch(songUrl) // , { headers }
//       .then((res) => res.json())
//       .then((data) => {
//         setPriceData(data);
//       });
//   } else if (searchMode === 'playlist') {
//     await fetch(playlistUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         setPriceData(data);
//       });
//   }
// }

export default async function Home({ params: { lang } }: { params: { lang: LangType } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <BackButton />
      <ResultsTable dictResultsTable={dict.resultstable} />
    </>
  );
}
