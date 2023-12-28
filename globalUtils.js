"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByMatchingDuration = void 0;
const sortByMatchingDuration = (duration) => {
    return (a, b) => {
        const diffSongA = Math.abs(a.duration - duration);
        const diffSongB = Math.abs(b.duration - duration);
        return diffSongA < diffSongB ? -1 : 1;
    };
};
exports.sortByMatchingDuration = sortByMatchingDuration;
