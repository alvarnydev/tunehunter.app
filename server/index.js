"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchVendorData_1 = require("./data/fetchVendorData");
const validateRequest_1 = require("./utils/validateRequest");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.get('/preview', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const previewData = await (0, fetchVendorData_1.fetchPreviewData)(req.query);
    res.send(previewData);
});
createHandler('beatport');
createHandler('amazon');
createHandler('bandcamp');
createHandler('itunes');
function createHandler(store) {
    return app.get(`/${store}`, async (req, res) => {
        if (!(0, validateRequest_1.isValidRequest)(req, res)) {
            return;
        }
        const vendorData = await (0, fetchVendorData_1.fetchVendorData)(req, store);
        res.send(vendorData);
    });
}
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
