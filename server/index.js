"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchSongData_1 = require("./data/fetchSongData");
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
app.get('/beatport', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const data = await (0, fetchSongData_1.fetchStoreData)(req, 'beatport');
    res.send(data);
});
app.get('/amazon', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const data = await (0, fetchSongData_1.fetchStoreData)(req, 'amazon');
    res.send(data);
});
app.get('/bandcamp', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const data = await (0, fetchSongData_1.fetchStoreData)(req, 'bandcamp');
    res.send(data);
});
app.get('/itunes', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const data = await (0, fetchSongData_1.fetchStoreData)(req, 'itunes');
    res.send(data);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
