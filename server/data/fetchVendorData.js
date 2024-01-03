"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPreviewData = exports.fetchVendorData = exports.fetchSpecificSong = void 0;
const axios_1 = __importDefault(require("axios"));
const sorting_1 = require("../utils/sorting");
const fetchSpecificSong = async (req) => {
    const { song } = await fetchItunesData(req.query);
    return {
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        country: req.query.country,
    };
};
exports.fetchSpecificSong = fetchSpecificSong;
const fetchVendorData = async (req, store) => {
    const { title, artist, duration, country } = req.query;
    const requestData = { country, artist, title, duration };
    switch (store) {
        case 'itunes':
            return await fetchItunesData(requestData);
        case 'beatport':
            return await fetchBeatportData(requestData);
        case 'amazon':
            return await fetchAmazonData(requestData);
        case 'bandcamp':
            return await fetchBandcampData(requestData);
        default:
            return fetchPlaceholderValues('song store');
    }
};
exports.fetchVendorData = fetchVendorData;
const fetchPreviewData = async ({ country, title, artist, duration, album }) => {
    let dataUrl = new URL(`https://itunes.apple.com/search?country=${country}&media=music&entity=song&limit=5&term=${title}+${artist}`).href;
    if (album)
        dataUrl += `+${album}`;
    const response = await axios_1.default.get(dataUrl);
    const data = response.data;
    // Grab what we need from the response
    const previewData = data.results.map((song) => {
        return {
            title: song.trackName,
            artist: song.artistName,
            album: song.collectionName,
            duration: song.trackTimeMillis,
            qualityFormat: 'AAC',
            qualityKbps: 256,
            price: song.trackPrice,
            songLink: song.trackViewUrl,
            artLink: song.artworkUrl100.replace('100x100', '400x400'),
        };
    });
    if (duration) {
        previewData.sort((0, sorting_1.sortByMatchingDuration)(duration));
    }
    return previewData;
};
exports.fetchPreviewData = fetchPreviewData;
const fetchItunesData = async ({ country, title, artist, duration }) => {
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await axios_1.default.get(dataUrl);
    const data = response.data;
    const songs = data.results.map((song) => {
        return {
            title: song.trackName,
            artist: song.artistName,
            album: song.collectionName,
            duration: song.trackTimeMillis,
            qualityFormat: 'AAC',
            qualityKbps: 256,
            price: song.trackPrice,
            songLink: song.trackViewUrl,
            artLink: song.artworkUrl100,
        };
    });
    if (duration) {
        songs.sort((0, sorting_1.sortByMatchingDuration)(duration));
    }
    return {
        vendor: {
            name: 'iTunes Store',
            country,
        },
        song: songs[0],
    };
};
const fetchBeatportData = async ({ country, title, artist, duration }) => {
    const beatportData = await fetchItunesData({ country, title, artist, duration });
    beatportData.vendor.name = 'Beatport';
    return beatportData;
};
const fetchAmazonData = async ({ country, title, artist, duration }) => {
    const amazonData = await fetchItunesData({ country, title, artist, duration });
    amazonData.vendor.name = 'Amazon Music';
    return amazonData;
};
const fetchBandcampData = async ({ country, title, artist, duration }) => {
    const bandcampData = await fetchItunesData({ country, title, artist, duration });
    bandcampData.vendor.name = 'Bandcamp';
    return bandcampData;
};
function fetchPlaceholderValues(vendor) {
    const response = {
        vendor: {
            name: vendor,
            country: 'DE',
        },
        song: {
            title: 'ph title',
            artist: 'ph artist',
            album: 'song album',
            duration: 213,
            qualityFormat: 'MP3',
            qualityKbps: 320,
            price: 1.29,
            songLink: 'fancy link',
            artLink: 'album',
        },
    };
    return response;
}
