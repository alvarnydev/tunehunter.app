"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/itunes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { song, artist, country } = req.query;
    if (!country) {
        country = 'DE';
    }
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${song}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = yield fetch(dataUrl).then((res) => res.json());
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
    res.send({ response: response, filteredResponse: filteredResponse });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
