import { Request, Response } from 'express';
import { OurRequest } from './types';

export function validateHeaders(req: OurRequest, res: Response): boolean {
  const api_key = req.header('X-API-KEY');
  if (api_key !== process.env.API_KEY) {
    res.status(401).send('Unauthorized');
    return false;
  }
  return true;
}

export function validateParams(req: OurRequest, res: Response): boolean {
  let { title, artist, country } = req.query;
  if (!title || !artist || !country) {
    res.status(400).send('Missing title, artist or country!');
    return false;
  }
  return true;
}

export const isValidRequest = (req: OurRequest, res: Response): boolean => {
  if (!(validateHeaders(req, res) && validateParams(req, res))) {
    return false;
  }
  return true;
};