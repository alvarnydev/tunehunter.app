import { useTranslation } from 'react-i18next';
import { TrackData } from '../../../../globalTypes';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const TrackPreview = ({ songData, resultsRef }: { songData: TrackData[]; resultsRef: React.RefObject<HTMLDivElement> }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (resultsRef.current) resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [resultsRef]);

  function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  }

  const handleSelectSong = (index: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const country = searchParams.get('country');

    const selectedSong = songData[index];
    const newParams = `?country=${country}&artist=${selectedSong.artist}&title=${selectedSong.title}&duration=${selectedSong.duration}&album=${selectedSong.album}`;
    navigate(`/results${newParams}`);
  };

  const Modal = () => {
    return (
      <>
        <input type='checkbox' id='preview-modal' className='modal-toggle' />
        <label htmlFor='preview-modal' className='modal modal-bottom backdrop-blur-[10px] sm:modal-middle'>
          <label className='modal-box bg-transparent p-0 overflow-x-auto !w-auto !max-w-[400px] flex relative' htmlFor=''>
            <div className='carousel rounded-box'>
              {songData.map(
                (song, i) =>
                  i !== 0 && (
                    <div key={song.songLink} id={`slide${i}`} className='carousel-item card w-[400px] shadow-xl image-full'>
                      <figure>
                        <img src={song.artLink} alt='Album cover art' className='object-cover !h-auto' />
                      </figure>
                      <div className='card-body justify-end'>
                        <h2 className='card-title'>{song.artist}</h2>
                        <p className='grow-0'>
                          {song.title} ({formatDuration(song.duration)})
                        </p>
                        <p className='grow-0'>[{song.album}]</p>
                        <div className='card-actions mt-4 justify-between'>
                          <button className='btn btn-sm btn-outline text-white rounded-full text-xs w-auto' onClick={() => handleSelectSong(i)}>
                            {t('trackpreview.selectsong')}
                          </button>
                          <div className='flex gap-2 items-center justify-center'>
                            <a href={`#slide${i - 1}`} className='btn btn-xs btn-ghost btn-circle'>
                              ❮
                            </a>
                            <p className='grow-0'>{`${i} / ${songData.length - 1}`}</p>
                            <a href={`#slide${i + 1}`} className='btn btn-xs btn-ghost btn-circle'>
                              ❯
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </label>
        </label>
      </>
    );
  };

  return (
    <div className='bg-primary flex flex-col items-center justify-evenly rounded-2xl gap-4 p-8 w-96 m-0 lg'>
      <figure className='content-center'>
        <img src={songData[0].artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-start text-primary-content items-center text-center overflow-scroll p-0 gap-1'>
        <h2 className='text-xl font-bold'>{songData[0].artist}</h2>
        <p>
          {songData[0].title} ({formatDuration(songData[0].duration)})
        </p>
        <p>[{songData[0].album}]</p>
      </div>
      <label htmlFor='preview-modal' className={`btn btn-outline text-primary-content rounded-full text-xs w-auto ${songData.length === 1 ? 'hidden' : ''}`}>
        {t('trackpreview.wrongsong')}
      </label>
      <Modal />
    </div>
  );
};

export default TrackPreview;
