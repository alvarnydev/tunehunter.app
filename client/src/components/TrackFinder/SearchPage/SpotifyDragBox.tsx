import { useRef } from 'react';

const SpotifyDragBox = () => {
  const dragBox = useRef<HTMLDivElement>(null);

  function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragBox.current?.style.setProperty('background', 'white');
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragBox.current?.style.setProperty('background', 'transparent');

    console.log('Drop', e);
    const data = e.dataTransfer.items;
    for (let i = 0; i < data.length; i += 1) {
      console.log('… Drop: ', data[i].kind, data[i].type);
      data[i].getAsString((s) => {
        console.log('… Drop: text/plain\n', s);
      });
    }

    // const item1 = e.dataTransfer.getData('URL');
    // const item2 = e.dataTransfer.getData('text/x-moz-url');
    // const item3 = e.dataTransfer.getData('text/uri-list');
    // const item4 = e.dataTransfer.getData('text/plain');
    // const dt = e.dataTransfer;
    // const dtItems = e.dataTransfer.items;
    // const dtItem = e.dataTransfer.items[0].getAsString();
  }

  function onDragEnd(e: React.DragEvent<HTMLDivElement>) {
    // figure this out
  }

  return (
    <div
      className='absolute left-1/4 h-24 w-1/2 rounded-lg border-2 border-white'
      ref={dragBox}
      // onDragOver={onDrag}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    ></div>
  );
};

export default SpotifyDragBox;
