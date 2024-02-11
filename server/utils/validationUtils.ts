import { Response } from 'express';
import { DataRequest } from '../types';

export function validateHeaders(req: DataRequest, res: Response): boolean {
  console.log(req, res);
  return true;
}

export function validateParams(req: DataRequest, res: Response): boolean {
  let { title, artist, country } = req.query;
  if (!title || !artist || !country) {
    res.status(400).send('Missing title, artist or country!');
    return false;
  }
  return true;
}

export const isValidRequest = (req: DataRequest, res: Response): boolean => {
  if (!(validateHeaders(req, res) && validateParams(req, res))) {
    return false;
  }
  return true;
};
