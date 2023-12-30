import { Request, Response } from 'express';
import { RequestData, TrackData, VendorData } from '../../globalTypes';

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

export type DataRequest = Request<RequestParams, ResponseBody, RequestBody, RequestData>;
export type VendorDataResponse = Response<VendorData>;
export type PreviewDataResponse = Response<TrackData[]>;

// What the itunes API returns
export type ITunesData = {
  resultCount: number;
  results: ITunesResults[];
};

export type ITunesResults = {
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
