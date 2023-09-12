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
app.get('/beatport', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let { song, artist, country } = req.query;
    if (!country) {
        country = 'DE';
    }
    const response = fetchPlaceholderValues();
    res.send(response);
});
app.get('/itunes', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let { song, artist, country } = req.query;
    if (!country) {
        country = 'DE';
    }
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
app.get('/amazon', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let { song, artist, country } = req.query;
    if (!country) {
        country = 'DE';
    }
    const response = fetchPlaceholderValues();
    res.send(response);
});
app.get('/bandcamp', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let { song, artist, country } = req.query;
    if (!country) {
        country = 'DE';
    }
    const response = fetchPlaceholderValues();
    res.send(response);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
