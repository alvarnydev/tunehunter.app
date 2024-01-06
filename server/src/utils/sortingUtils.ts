import { TrackData } from '../../../globalTypes';

export const sortByMatchingDuration = (duration: number) => {
  return (a: TrackData, b: TrackData) => {
    const diffSongA = Math.abs(a.duration - duration);
    const diffSongB = Math.abs(b.duration - duration);
    return diffSongA < diffSongB ? -1 : 1;
  };
};
