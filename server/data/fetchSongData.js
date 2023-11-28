"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlaceholderValues = exports.fetchBandcampData = exports.fetchAmazonData = exports.fetchBeatportData = exports.fetchItunesData = exports.getData = void 0;
const getData = async (req, store) => {
    const { title, artist, duration, country } = req.query;
    const durationNum = parseInt(duration);
    switch (store) {
        case 'itunes':
            return await (0, exports.fetchItunesData)(title, artist, durationNum, country);
        case 'beatport':
            return await (0, exports.fetchBeatportData)(title, artist, durationNum, country);
        case 'amazon':
            return await (0, exports.fetchAmazonData)(title, artist, durationNum, country);
        case 'bandcamp':
            return await (0, exports.fetchBandcampData)(title, artist, durationNum, country);
        default:
            return fetchPlaceholderValues('song store');
    }
};
exports.getData = getData;
const fetchItunesData = async (title, artist, duration, country) => {
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await fetch(dataUrl).then((res) => res.json());
    // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
    const filteredResponse = response.results.map((song) => {
        return {
            vendor: {
                name: 'iTunes Store',
                country: song.country,
                songLink: song.trackViewUrl,
                artLink: song.artworkUrl100,
            },
            song: {
                title: song.trackName,
                artist: song.artistName,
                album: song.collectionName,
                duration: song.trackTimeMillis / 1000,
                qualityFormat: 'AAC',
                qualityKbps: 256,
                price: song.trackPrice,
            },
        };
    });
    // Sort by matching duration
    return filteredResponse.sort((a, b) => {
        const aDurationDiff = Math.abs(a.song.duration - duration);
        const bDurationDiff = Math.abs(b.song.duration - duration);
        return aDurationDiff - bDurationDiff;
    });
};
exports.fetchItunesData = fetchItunesData;
const fetchBeatportData = async (title, artist, duration, country) => {
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await fetch(dataUrl).then((res) => res.json());
    // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
    const filteredResponse = response.results.map((song) => {
        return {
            vendor: {
                name: 'Beatport',
                country: song.country,
                songLink: song.trackViewUrl,
                artLink: song.artworkUrl100,
            },
            song: {
                title: song.trackName,
                artist: song.artistName,
                album: song.collectionName,
                duration: song.trackTimeMillis / 1000,
                qualityFormat: 'AAC',
                qualityKbps: 256,
                price: song.trackPrice,
            },
        };
    });
    // Sort by matching duration
    return filteredResponse.sort((a, b) => {
        const aDurationDiff = Math.abs(a.song.duration - duration);
        const bDurationDiff = Math.abs(b.song.duration - duration);
        return aDurationDiff - bDurationDiff;
    });
};
exports.fetchBeatportData = fetchBeatportData;
const fetchAmazonData = async (title, artist, duration, country) => {
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await fetch(dataUrl).then((res) => res.json());
    // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
    const filteredResponse = response.results.map((song) => {
        return {
            vendor: {
                name: 'Amazon Music',
                country: song.country,
                songLink: song.trackViewUrl,
                artLink: song.artworkUrl100,
            },
            song: {
                title: song.trackName,
                artist: song.artistName,
                album: song.collectionName,
                duration: song.trackTimeMillis / 1000,
                qualityFormat: 'AAC',
                qualityKbps: 256,
                price: song.trackPrice,
            },
        };
    });
    // Sort by matching duration
    return filteredResponse.sort((a, b) => {
        const aDurationDiff = Math.abs(a.song.duration - duration);
        const bDurationDiff = Math.abs(b.song.duration - duration);
        return aDurationDiff - bDurationDiff;
    });
};
exports.fetchAmazonData = fetchAmazonData;
const fetchBandcampData = async (title, artist, duration, country) => {
    const dataUrl = new URL(`https://itunes.apple.com/search?term=${title}+${artist}&country=${country}&media=music&entity=song&limit=5`).href;
    const response = await fetch(dataUrl).then((res) => res.json());
    // Create unified TrackInfoType[] response, grabbing the data we need from the third party <any> API response
    const filteredResponse = response.results.map((song) => {
        return {
            vendor: {
                name: 'Bandcamp',
                country: song.country,
                songLink: song.trackViewUrl,
                artLink: song.artworkUrl100,
            },
            song: {
                title: song.trackName,
                artist: song.artistName,
                album: song.collectionName,
                duration: song.trackTimeMillis / 1000,
                qualityFormat: 'AAC',
                qualityKbps: 256,
                price: song.trackPrice,
            },
        };
    });
    // Sort by matching duration
    return filteredResponse.sort((a, b) => {
        const aDurationDiff = Math.abs(a.song.duration - duration);
        const bDurationDiff = Math.abs(b.song.duration - duration);
        return aDurationDiff - bDurationDiff;
    });
};
exports.fetchBandcampData = fetchBandcampData;
function fetchPlaceholderValues(vendor) {
    const response = [
        {
            vendor: {
                name: vendor,
                country: 'DE',
                songLink: 'fancy link',
                artLink: 'album',
            },
            song: {
                title: 'ph title',
                artist: 'ph artist',
                album: 'song album',
                duration: 213,
                qualityFormat: 'MP3',
                qualityKbps: 320,
                price: 1.29,
            },
        },
        {
            vendor: {
                name: 'itunesstore 2',
                country: 'testcountry 2',
                songLink: 'fancy link 2',
                artLink: 'album 2',
            },
            song: {
                title: 'ph title 2',
                artist: 'ph artist 2',
                album: 'song album 2',
                duration: 187,
                qualityFormat: 'MP3 2',
                qualityKbps: 320,
                price: 2.29,
            },
        },
    ];
    return response;
}
exports.fetchPlaceholderValues = fetchPlaceholderValues;
