import express, { Express, Request, Response } from 'express';
import { fetchAmazonData, fetchBandcampData, fetchBeatportData, fetchItunesData, fetchPlaceholderValues } from './data/fetchSongData';
import dotenv from 'dotenv';
import { isValidRequest } from './utils/validateRequest';
import { OurRequest } from './utils/types';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.get('/beatport', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }

  const { title, artist, duration, country } = req.query;
  const durationNum = parseInt(duration);
  const itunesData = await fetchBeatportData(title, artist, durationNum, country);
  res.send(itunesData);
});

app.get('/amazon', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }

  const { title, artist, duration, country } = req.query;
  const durationNum = parseInt(duration);
  const itunesData = await fetchAmazonData(title, artist, durationNum, country);
  res.send(itunesData);
});

app.get('/bandcamp', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }

  const { title, artist, duration, country } = req.query;
  const durationNum = parseInt(duration);
  const itunesData = await fetchBandcampData(title, artist, durationNum, country);
  res.send(itunesData);
});

app.get('/itunes', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }

  const { title, artist, duration, country } = req.query;
  const durationNum = parseInt(duration);
  const itunesData = await fetchItunesData(title, artist, durationNum, country);
  res.send(itunesData);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
