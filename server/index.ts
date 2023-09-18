import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { TrackInfoType } from '../types';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

function fetchPlaceholderValues() {
  const response = [
    {
      kind: 'song',
      artistName: 'Artist Name',
      trackName: 'Track Name',
      trackTime: 100,
      trackPrice: 1.99,
      artworkUrl: 'https://via.placeholder.com/100',
      trackViewUrl: 'https://via.placeholder.com/100',
    },
    {
      kind: 'song2',
      artistName: 'Artist Name',
      trackName: 'Track Name',
      trackTime: 100,
      trackPrice: 1.99,
      artworkUrl: 'https://via.placeholder.com/100',
      trackViewUrl: 'https://via.placeholder.com/100',
    },
  ];

  return response;
}

function validateKey(req: Request, res: Response): boolean {
  const api_key = req.header('X-API-KEY');
  if (api_key !== process.env.API_KEY) {
    res.status(401).send('Unauthorized');
    return false;
  }
  return true;
}

function validateParams(req: Request, res: Response): boolean {
  let { title, artist, country } = req.query;
  if (!title || !artist || !country) {
    res.status(400).send('Missing title, artist or country!');
    return false;
  }
  return true;
}

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.get('/beatport', async (req: Request, res: Response) => {
  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { title, artist, country } = req.query;

  const response = fetchPlaceholderValues();
  res.send(response);
});

app.get('/amazon', async (req: Request, res: Response) => {
  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { title, artist, country } = req.query;

  const response = fetchPlaceholderValues();
  res.send(response);
});

app.get('/bandcamp', async (req: Request, res: Response) => {
  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { title, artist, country } = req.query;

  const response = fetchPlaceholderValues();
  res.send(response);
});

app.get('/itunes', async (req: Request, res: Response) => {
  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { title, artist, country } = req.query;

  const dataUrl = new URL(
    `https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`
  ).href;
  const response = await fetch(dataUrl).then((res) => res.json());

  // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
  const filteredResponse: TrackInfoType[] = response.results.map((song: any) => {
    return {
      vendor: {
        name: 'itunesstore',
        country: song.country,
        link: song.trackViewUrl,
      },
      song: {
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        duration: song.trackTimeMillis / 1000,
        qualityFormat: song.kind, // todo: figure out format from song.previewUrl
        qualityKbps: 0, // todo: figure out kbps from song.previewUrl
        price: song.trackPrice,
      },
    };
  });

  res.send(filteredResponse);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
