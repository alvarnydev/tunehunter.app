import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import { VendorDataRequest, VendorDataResponse } from './utils/types';
import { fetchVendorData } from './data/fetchVendorData';
import { isValidRequest } from './utils/validateRequest';
import { ResponseData, VendorData, VendorData as VendorDataResponseType } from '../globalTypes';

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

app.get('/beatport', async (req: VendorDataRequest, res: VendorDataResponse) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const vendorData = await fetchVendorData(req, 'beatport');
  res.send(vendorData);
});

app.get('/amazon', async (req: VendorDataRequest, res: VendorDataResponse) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const vendorData = await fetchVendorData(req, 'amazon');
  res.send(vendorData);
});

app.get('/bandcamp', async (req: VendorDataRequest, res: VendorDataResponse) => {
  if (!isValidRequest(req, res)) {
    return;
  }

  const vendorData = await fetchVendorData(req, 'bandcamp');
  res.send(vendorData);
});

app.get('/itunes', async (req: VendorDataRequest, res: VendorDataResponse) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const vendorData = await fetchVendorData(req, 'itunes');
  res.send(vendorData);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
