import { ResponseData } from '../../../globalTypes';

export function validateData(responseData: ResponseData): number {
  // todo: itunes length 0 or undefined?
  if (responseData.preview.length == 0 || responseData.itunes == undefined) {
    return 0;
  }
  return 1;
}

// export function filterData(responseData: ResponseDataType): ResponseDataType {
//   // todo: If we find multiple songs to the input, have the user pick the one he/she means.
//   // If the search params contain a duration, the user already narrowed down the search to a single song.
//   // implement logic to pick the song the fits the picked duration the best

//   console.log('api data', responseData.itunesData);
//   responseData.itunesData.songs.map((song) => {
//     console.log('artist: ', song.artist);
//     console.log('title: ', song.title);
//     console.log('duration: ', song.duration);
//   });

//   // const filteredData = {
//   //   amazonData: responseData.amazonData[0],
//   //   beatportData: responseData.beatportData[0],
//   //   itunesData: responseData.itunesData[0],
//   //   bandcampData: responseData.bandcampData[0],
//   // };

// }
