export const sortFn = (a, b, duration) => {
  const aDurationDiff = Math.abs(a.song.duration - duration);
  const bDurationDiff = Math.abs(b.song.duration - duration);
  return aDurationDiff - bDurationDiff;
};
