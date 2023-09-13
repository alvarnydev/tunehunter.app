import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

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

function init(req: Request, res: Response) {
  setHeaders(res);
  validateKey(req, res);
  validateParams(req, res);
}

function setHeaders(res: Response) {
  res.set('Access-Control-Allow-Origin', '*');
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
  let { song, artist, country } = req.query;
  if (!song || !artist) {
    res.status(400).send('Missing song or artist');
    return false;
  }
  if (!country) {
    country = 'DE';
  }
  return true;
}

app.get('/beatport', async (req: Request, res: Response) => {
  setHeaders(res);

  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { song, artist, country } = req.query;

  const response = fetchPlaceholderValues();
  res.send(response);
});

app.get('/amazon', async (req: Request, res: Response) => {
  setHeaders(res);

  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { song, artist, country } = req.query;

  const response = fetchPlaceholderValues();
  res.send(response);
});

app.get('/bandcamp', async (req: Request, res: Response) => {
  setHeaders(res);

  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { song, artist, country } = req.query;

  const response = fetchPlaceholderValues();
  res.send(response);
});

app.get('/itunes', async (req: Request, res: Response) => {
  setHeaders(res);

  if (!(validateKey(req, res) && validateParams(req, res))) {
    return;
  }
  let { song, artist, country } = req.query;

  const dataUrl = new URL(
    `https://itunes.apple.com/search?term=${song}+${artist}&country=${country}&media=music&entity=song&limit=5`
  ).href;
  const response = await fetch(dataUrl).then((res) => res.json());
  console.log(response);
  const filteredResponse = response.results.map((song: any) => {
    return {
      kind: song.kind,
      artistName: song.artistName,
      trackName: song.trackName,
      trackTime: song.trackTimeMillis / 1000,
      trackPrice: song.trackPrice,
      artworkUrl: song.artworkUrl100,
      trackViewUrl: song.trackViewUrl,
    };
  });

  res.send(filteredResponse);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
