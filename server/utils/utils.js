"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByDuration = void 0;
// export const songSortFn = (a: TrackDataType, b: TrackDataType, duration: number) => {
//   const aDurationDiff = Math.abs(a.song.duration - duration);
//   const bDurationDiff = Math.abs(b.song.duration - duration);
//   return aDurationDiff - bDurationDiff;
// };
const sortByDuration = (duration) => {
    return (a, b) => {
        const diffSongA = Math.abs(a.duration - duration);
        const diffSongB = Math.abs(b.duration - duration);
        return diffSongA < diffSongB ? -1 : 1;
    };
};
exports.sortByDuration = sortByDuration;
