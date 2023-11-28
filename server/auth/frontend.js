"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateKey = void 0;
function validateKey(req, res) {
    const api_key = req.header('X-API-KEY');
    if (api_key !== process.env.API_KEY) {
        res.status(401).send('Unauthorized');
        return false;
    }
    return true;
}
exports.validateKey = validateKey;
function validateParams(req, res) {
    let { title, artist, country } = req.query;
    if (!title || !artist || !country) {
        res.status(400).send('Missing title, artist or country!');
        return false;
    }
    return true;
}
exports.validateParams = validateParams;
