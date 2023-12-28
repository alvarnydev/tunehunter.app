import { Request, Response } from 'express';

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  title: string;
  artist: string;
  duration: string;
  country: string;
}

export type VendorDataRequest = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
export type VendorDataResponse = Response<ResponseBody>;

// What the itunes API returns
export type ITunesDataType = {
  resultCount: number;
  results: ITunesResultsType[];
};

export type ITunesResultsType = {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  isStreamable: boolean;
  collectionArtistName?: string;
};
