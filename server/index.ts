import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import { OurRequest } from './utils/types';
import { getData } from './data/fetchSongData';
import { isValidRequest } from './utils/validateRequest';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/api/spotify/auth', async (req: OurRequest, res: Response) => {});

app.get('/api/spotify/refresh', async (req: OurRequest, res: Response) => {});

app.get('/api/spotify/user', async (req: OurRequest, res: Response) => {});

app.get('/api/beatport', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const data = await getData(req, 'beatport');
  res.send(data);
});

app.get('/api/amazon', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const data = await getData(req, 'amazon');
  res.send(data);
});

app.get('/api/bandcamp', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const data = await getData(req, 'bandcamp');
  res.send(data);
});

app.get('/api/itunes', async (req: OurRequest, res: Response) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const data = await getData(req, 'itunes');
  res.send(data);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
