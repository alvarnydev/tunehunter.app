import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataRequest, LogRequest, PreviewDataResponse, VendorDataResponse } from './types';
import { fetchPreviewData, fetchVendorData } from './data/fetchVendorData';
import { isValidRequest } from './utils/validationUtils';
import { logMessage } from './utils/loggingUtils';

// Config and EVs
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const allowOrigin = process.env.ALLOW_ORIGIN || 'null';

// Pre-flight
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

// Hello
app.get('/', (_, res) => {
  res.send('Hello World!');
});

// Logging
app.post('/log', async (req: LogRequest, res) => {
  const statusLogger = await logMessage(req);
  res.sendStatus(statusLogger);
});

// Music data
app.get('/preview', async (req: DataRequest, res: PreviewDataResponse) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  const previewData = await fetchPreviewData(req.query);
  res.send(previewData);
});
function createHandler(store: string) {
  return app.get(`/${store}`, async (req: DataRequest, res: VendorDataResponse) => {
    if (!isValidRequest(req, res)) {
      return;
    }
    const vendorData = await fetchVendorData(req, store);
    res.send(vendorData);
  });
}
createHandler('beatport');
createHandler('amazon');
createHandler('bandcamp');
createHandler('itunes');

// Vamos
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
