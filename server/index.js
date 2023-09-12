"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/itunes', async (req, res) => {
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
    res.send({ response, filteredResponse });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
