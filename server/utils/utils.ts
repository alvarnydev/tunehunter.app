import { TrackData } from '../../globalTypes';

// export const songSortFn = (a: TrackDataType, b: TrackDataType, duration: number) => {
//   const aDurationDiff = Math.abs(a.song.duration - duration);
//   const bDurationDiff = Math.abs(b.song.duration - duration);
//   return aDurationDiff - bDurationDiff;
// };

export const sortByDuration = (duration: number) => {
  return (a: TrackData, b: TrackData) => {
    const diffSongA = Math.abs(a.duration - duration);
    const diffSongB = Math.abs(b.duration - duration);
    return diffSongA < diffSongB ? -1 : 1;
  };
};
