import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataRequest, LogRequest, PreviewDataResponse, VendorDataResponse } from './types';
import { fetchPreviewData, fetchVendorData } from './data/fetchVendorData';
import { isValidRequest } from './utils/validationUtils';
import { logMessage } from './utils/loggingUtils';
import { rateLimit } from 'express-rate-limit';

// // Config and EVs
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const allowOrigin = process.env.ALLOW_ORIGIN || 'null';

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

// Pre-flight: allow (only) these requests
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});
// Read POST bodies
app.use(express.json());

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
