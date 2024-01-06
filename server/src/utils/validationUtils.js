"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRequest = exports.validateParams = exports.validateHeaders = void 0;
function validateHeaders(req, res) {
    const api_key = req.header('X-API-KEY');
    if (api_key !== process.env.API_KEY) {
        res.status(401).send('Unauthorized');
        return false;
    }
    return true;
}
exports.validateHeaders = validateHeaders;
function validateParams(req, res) {
    let { title, artist, country } = req.query;
    if (!title || !artist || !country) {
        res.status(400).send('Missing title, artist or country!');
        return false;
    }
    return true;
}
exports.validateParams = validateParams;
const isValidRequest = (req, res) => {
    if (!(validateHeaders(req, res) && validateParams(req, res))) {
        return false;
    }
    return true;
};
exports.isValidRequest = isValidRequest;
