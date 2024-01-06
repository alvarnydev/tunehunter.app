"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchVendorData_1 = require("./data/fetchVendorData");
const validationUtils_1 = require("./utils/validationUtils");
const loggingUtils_1 = require("./utils/loggingUtils");
// Config and EVs
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.post('/log', async (req, res) => {
    const statusLogger = await (0, loggingUtils_1.logMessage)(req);
    res.sendStatus(statusLogger);
});
// Music data
app.get('/preview', async (req, res) => {
    if (!(0, validationUtils_1.isValidRequest)(req, res)) {
        return;
    }
    const previewData = await (0, fetchVendorData_1.fetchPreviewData)(req.query);
    res.send(previewData);
});
function createHandler(store) {
    return app.get(`/${store}`, async (req, res) => {
        if (!(0, validationUtils_1.isValidRequest)(req, res)) {
            return;
        }
        const vendorData = await (0, fetchVendorData_1.fetchVendorData)(req, store);
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
