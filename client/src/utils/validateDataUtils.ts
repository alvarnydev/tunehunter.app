import { ResultsDataType } from '@/types';
import { ResponseDataType } from '../../../globalTypes';

export function validateData(apiData: ResponseDataType): number {
  // todo: itunes length 0 or undefined?
  if (apiData.itunesData.length == 0 || apiData.itunesData == undefined) return 0;
  return 1;
}

export function filterData(apiData: ResponseDataType): ResultsDataType {
  // todo: If we find multiple songs to the input, have the user pick the one he/she means.
  // If the search params contain a duration, the user already narrowed down the search to a single song.
  // implement logic to pick the song the fits the picked duration the best

  const filteredData: ResultsDataType = {
    amazonData: apiData.amazonData[0],
    beatportData: apiData.beatportData[0],
    itunesData: apiData.itunesData[0],
    bandcampData: apiData.bandcampData[0],
  };

  return filteredData;
}
