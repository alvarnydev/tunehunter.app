"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchVendorData = exports.fetchSpecificSong = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const fetchSpecificSong = async (req) => {
    const { songs } = await fetchItunesData(req.query);
    return {
        title: songs[0].title,
        artist: songs[0].artist,
        duration: songs[0].duration,
        country: req.query.country,
    };
};
exports.fetchSpecificSong = fetchSpecificSong;
const fetchVendorData = async (req, store) => {
    console.log('--------- fetchStoreData: ', store, ' ---------');
    const { title, artist, duration, country } = req.query;
    const requestData = { country, artist, title, duration };
    console.log('requestData: ', requestData);
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
const fetchItunesData = async ({ country, title, artist, duration }) => {
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
    if (duration) {
        vendorData.songs.sort((0, utils_1.sortByMatchingDuration)(duration));
    }
    return vendorData;
};
const fetchBeatportData = async ({ country, title, artist, duration }) => {
    return await fetchItunesData({ country, title, artist, duration });
};
const fetchAmazonData = async ({ country, title, artist, duration }) => {
    return await fetchItunesData({ country, title, artist, duration });
};
const fetchBandcampData = async ({ country, title, artist, duration }) => {
    return await fetchItunesData({ country, title, artist, duration });
};
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
