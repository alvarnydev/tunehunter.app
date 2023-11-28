"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchSongData_1 = require("./data/fetchSongData");
const dotenv_1 = __importDefault(require("dotenv"));
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
app.get('/beatport', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const { title, artist, duration, country } = req.query;
    const durationNum = parseInt(duration);
    const itunesData = await (0, fetchSongData_1.fetchBeatportData)(title, artist, durationNum, country);
    res.send(itunesData);
});
app.get('/amazon', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const { title, artist, duration, country } = req.query;
    const durationNum = parseInt(duration);
    const itunesData = await (0, fetchSongData_1.fetchAmazonData)(title, artist, durationNum, country);
    res.send(itunesData);
});
app.get('/bandcamp', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const { title, artist, duration, country } = req.query;
    const durationNum = parseInt(duration);
    const itunesData = await (0, fetchSongData_1.fetchBandcampData)(title, artist, durationNum, country);
    res.send(itunesData);
});
app.get('/itunes', async (req, res) => {
    if (!(0, validateRequest_1.isValidRequest)(req, res)) {
        return;
    }
    const { title, artist, duration, country } = req.query;
    const durationNum = parseInt(duration);
    const itunesData = await (0, fetchSongData_1.fetchItunesData)(title, artist, durationNum, country);
    res.send(itunesData);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
