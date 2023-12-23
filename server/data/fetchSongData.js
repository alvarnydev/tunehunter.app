"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlaceholderValues = exports.fetchBandcampData = exports.fetchAmazonData = exports.fetchBeatportData = exports.fetchItunesData = exports.fetchStoreData = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const fetchStoreData = async (req, store) => {
    console.log('--------- fetchStoreData: ', store, ' ---------');
    const { title, artist, duration, country } = req.query;
    const durationNum = parseInt(duration);
    const requestData = { country, searchQuery: { artist, title, duration: durationNum } };
    switch (store) {
        case 'itunes':
            return await (0, exports.fetchItunesData)(requestData);
        case 'beatport':
            return await (0, exports.fetchBeatportData)(requestData);
        case 'amazon':
            return await (0, exports.fetchAmazonData)(requestData);
        case 'bandcamp':
            return await (0, exports.fetchBandcampData)(requestData);
        default:
            return fetchPlaceholderValues('song store');
    }
};
exports.fetchStoreData = fetchStoreData;
const fetchItunesData = async ({ country, searchQuery: { title, artist, duration } }) => {
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await axios_1.default.get(dataUrl);
    const data = response.data;
    // Grab what we need from the response
    const vendorData = {
        vendor: {
            name: 'iTunes Store',
            country,
        },
        songs: data.results.map((song) => {
            return {
                title: song.trackName,
                artist: song.artistName,
                album: song.collectionName,
                duration: song.trackTimeMillis / 1000,
                qualityFormat: 'AAC',
                qualityKbps: 256,
                price: song.trackPrice,
                songLink: song.trackViewUrl,
                artLink: song.artworkUrl100,
            };
        }),
    };
    // Sort the songs by matching duration
    console.log('  <<   start    >>    ');
    vendorData.songs.map((song) => {
        console.log('arist ', song.artist);
        console.log('title ', song.title);
        console.log('duration ', song.duration);
    });
    console.log('  <<   sort    >>    ');
    vendorData.songs.sort((0, utils_1.sortByDuration)(duration));
    vendorData.songs.map((song) => {
        console.log('arist ', song.artist);
        console.log('title ', song.title);
        console.log('duration ', song.duration);
    });
    console.log('  <<   end    >>    ');
    return vendorData;
};
exports.fetchItunesData = fetchItunesData;
const fetchBeatportData = async ({ country, searchQuery: { title, artist, duration } }) => {
    return await (0, exports.fetchItunesData)({ country, searchQuery: { title, artist, duration } });
};
exports.fetchBeatportData = fetchBeatportData;
const fetchAmazonData = async ({ country, searchQuery: { title, artist, duration } }) => {
    return await (0, exports.fetchItunesData)({ country, searchQuery: { title, artist, duration } });
};
exports.fetchAmazonData = fetchAmazonData;
const fetchBandcampData = async ({ country, searchQuery: { title, artist, duration } }) => {
    return await (0, exports.fetchItunesData)({ country, searchQuery: { title, artist, duration } });
};
exports.fetchBandcampData = fetchBandcampData;
function fetchPlaceholderValues(vendor) {
    const response = {
        vendor: {
            name: vendor,
            country: 'DE',
        },
        songs: [
            {
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
            {
                title: 'ph title 2',
                artist: 'ph artist 2',
                album: 'song album 2',
                duration: 187,
                qualityFormat: 'MP3 2',
                qualityKbps: 320,
                price: 2.29,
                songLink: 'fancy link',
                artLink: 'album',
            },
        ],
    };
    return response;
}
exports.fetchPlaceholderValues = fetchPlaceholderValues;
