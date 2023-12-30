import { useTranslation } from 'react-i18next';
import { TrackData } from '../../../../globalTypes';
import { useNavigate } from 'react-router';

const TrackPreview = ({ songData }: { songData: TrackData[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectSong = (index: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const country = searchParams.get('country');

    const selectedSong = songData[index];
    const newParams = `?country=${country}&artist=${selectedSong.artist}&title=${selectedSong.title}&duration=${selectedSong.duration}`;
    navigate(`/results${newParams}`);
  };

  const Modal = () => {
    function formatDuration(duration: number) {
      const minutes = Math.floor(duration / 60000);
      const seconds = ((duration % 60000) / 1000).toFixed(0);
      return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
    }

    return (
      <>
        <input type='checkbox' id='my-modal-3' className='modal-toggle' />
        <div className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box !max-w-3xl p-8 overflow-x-auto relative'>
            <label htmlFor='my-modal-3' className='btn btn-sm btn-circle absolute right-2 top-2'>
              ✕
            </label>
            <div className='carousel h-100'>
              {songData.map(
                (song, i) =>
                  i !== 0 && (
                    <div key={i} className='carousel-item w-48 flex flex-col items-center gap-4'>
                      <div className='flex flex-col items-center justify-start gap-4 m-0 lg h-64'>
                        <figure className='content-center'>
                          <img src={song.artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
                        </figure>
                        <div className='flex flex-col justify-start c items-center text-center max-h-20 overflow-scroll p-0 gap-1'>
                          <h2 className='text-xl font-bold'>{song.artist}</h2>
                          <p>
                            {song.title} ({formatDuration(song.duration * 1000)})
                          </p>
                        </div>
                      </div>
                      <button className='btn btn-sm btn-outline rounded-full text-xs w-auto m-auto' onClick={() => handleSelectSong(i)}>
                        {t('trackpreview.selectsong')}
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='bg-primary flex flex-col items-center justify-around rounded-2xl gap-4 p-8 w-96 m-0 lg'>
      <figure className='content-center'>
        <img src={songData[0].artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-start text-primary-content items-center text-center max-h-20 overflow-scroll p-0 gap-1'>
        <h2 className='text-xl font-bold'>{songData[0].artist}</h2>
        <p>{songData[0].title}</p>
      </div>
      <label htmlFor='my-modal-3' className='btn btn-outline text-primary-content rounded-full text-xs w-auto'>
        {t('trackpreview.wrongsong')}
      </label>
      <Modal />
    </div>
  );
};

export default TrackPreview;
