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

export type OurRequest = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
export type OurResponse = Response<ResponseBody>;
