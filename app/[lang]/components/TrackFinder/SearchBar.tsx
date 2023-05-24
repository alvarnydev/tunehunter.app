// 'use client';

// import { useState } from 'react';
// import SearchModeToggler from './SearchBar/SearchModeToggler';
// import SearchTextInput from './SearchBar/SearchInput';
// import SearchButton from './SearchButton';
// import { PriceDataType } from '@/types';

// interface ISearchBarProps {
//   setPriceData: (priceData: [PriceDataType]) => void;
// }

// const SearchBar = ({ setPriceData }: ISearchBarProps) => {
//   const [searchMode, setSearchMode] = useState('song');
//   const [songSearchQuery, setSongSearchQuery] = useState({ artist: '', song: '' });
//   const [playlistSearchString, setPlaylistSearchString] = useState('');

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     /*
//     Bandcamp:
//     - https://bandcamp.com/search?q=artist+song

//     Beatport:
//     - https://www.beatport.com/search?q=artist+song

//     Amazon Music:
//     - https://music.amazon.com/search/artist+song

//     iTunes Store:
//     - https://itunes.apple.com/search?term=need+to+feel+loved&country=US&media=music&entity=song&limit=10

//     */

//     if (searchMode === 'song') {
//       await fetch(`/api/price?artist=${songSearchQuery.artist}&song=${songSearchQuery.song}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setPriceData(data);
//         });
//     } else if (searchMode === 'playlist') {
//       await fetch(`/api/price?playlist=${playlistSearchString}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setPriceData(data);
//         });
//     }
//   }

//   return (
//     <form className='flex md:flex-row flex-col w-4/5 md:gap-10 gap-8' onSubmit={handleSubmit}>
//       <SearchModeToggler
//         searchMode={searchMode}
//         setSearchMode={setSearchMode}
//         songSearchQuery={songSearchQuery}
//         playlistSearchString={playlistSearchString}
//         setSongSearchQuery={setSongSearchQuery}
//         setPlaylistSearchString={setPlaylistSearchString}
//       />
//       <SearchTextInput
//         searchMode={searchMode}
//         songSearchQuery={songSearchQuery}
//         setSongSearchQuery={setSongSearchQuery}
//         playlistSearchString={playlistSearchString}
//         setPlaylistSearchString={setPlaylistSearchString}
//       />
//       <SearchButton />
//     </form>
//   );
// };

// export default SearchBar;
