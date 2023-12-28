import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import { VendorDataRequest, VendorDataResponse } from './utils/types';
import { fetchSpecificSong, fetchVendorData } from './data/fetchVendorData';
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

function createHandler(store: string) {
  return app.get(`/${store}`, async (req: VendorDataRequest, res: VendorDataResponse) => {
    if (!isValidRequest(req, res)) {
      return;
    }
    if (!req.query.duration) {
      const { duration } = await fetchSpecificSong(req);
      req.query.duration = duration;
    }
    const vendorData = await fetchVendorData(req, store);
    res.send(vendorData);
  });
}

createHandler('beatport');
createHandler('amazon');
createHandler('bandcamp');
createHandler('itunes');

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
