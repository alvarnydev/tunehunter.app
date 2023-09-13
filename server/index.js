"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
function validateKey(req, res) {
    const api_key = req.header('X-API-KEY');
    if (api_key !== process.env.API_KEY) {
        res.status(401).send('Unauthorized');
        return false;
    }
    return true;
}
function validateParams(req, res) {
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
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.get('/beatport', async (req, res) => {
    if (!(validateKey(req, res) && validateParams(req, res))) {
        return;
    }
    let { song, artist, country } = req.query;
    const response = fetchPlaceholderValues();
    res.send(response);
});
app.get('/amazon', async (req, res) => {
    if (!(validateKey(req, res) && validateParams(req, res))) {
        return;
    }
    let { song, artist, country } = req.query;
    const response = fetchPlaceholderValues();
    res.send(response);
});
app.get('/bandcamp', async (req, res) => {
    if (!(validateKey(req, res) && validateParams(req, res))) {
        return;
    }
    let { song, artist, country } = req.query;
    const response = fetchPlaceholderValues();
    res.send(response);
});
app.get('/itunes', async (req, res) => {
    if (!(validateKey(req, res) && validateParams(req, res))) {
        return;
    }
    let { song, artist, country } = req.query;
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${song}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await fetch(dataUrl).then((res) => res.json());
    const filteredResponse = response.results.map((song) => {
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
