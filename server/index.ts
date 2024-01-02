import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataRequest, PreviewDataResponse, VendorDataResponse } from './utils/types';
import { fetchPreviewData, fetchSpecificSong, fetchVendorData } from './data/fetchVendorData';
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

app.get('/preview', async (req: DataRequest, res: PreviewDataResponse) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const previewData = await fetchPreviewData(req.query);
  res.send(previewData);
});

createHandler('beatport');
createHandler('amazon');
createHandler('bandcamp');
createHandler('itunes');

function createHandler(store: string) {
  return app.get(`/${store}`, async (req: DataRequest, res: VendorDataResponse) => {
    if (!isValidRequest(req, res)) {
      return;
    }
    const vendorData = await fetchVendorData(req, store);
    res.send(vendorData);
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
