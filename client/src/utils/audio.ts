export const playJingle = (reverse?: boolean) => {
  let audio = new Audio('/jingle.mp3');
  if (reverse) {
    audio = new Audio('/jingle-reverse.mp3');
  }
  audio.play();
};
