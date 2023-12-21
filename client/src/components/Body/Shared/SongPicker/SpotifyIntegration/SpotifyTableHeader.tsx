import { useEffect, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { SongTableTab } from '@/types';

interface ISpotifyTableHeaderProps {
  tab: string;
  handleTabUpdate: (newTab: SongTableTab) => void;
  dataRefreshTimer: React.MutableRefObject<number>;
  startDataRefresh: () => void;
}

const SpotifyTableHeader = ({ tab, handleTabUpdate, dataRefreshTimer, startDataRefresh }: ISpotifyTableHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex justify-center py-2 mx-[2%] border-b-neutral border-b-[1px]'>
      <div className='w-full flex justify-between items-center'>
        <div>
          <p> {t('spotifyBox.prompt')}</p>
        </div>
        <TabPicker tab={tab} handleTabUpdate={handleTabUpdate} />
        <TimeLeftIndicator dataRefreshTimer={dataRefreshTimer} startDataRefresh={startDataRefresh} />
      </div>
    </div>
  );
};

const TabPicker = ({ tab, handleTabUpdate }: { tab: string; handleTabUpdate: (newTab: SongTableTab) => void }) => {
  const { t } = useTranslation();

  return (
    <div className='join'>
      <button className={`join-item capitalize text-base tracking-wide btn-ghost btn btn-sm rounded-l-full ${tab === 'recentlyPlayed' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('recentlyPlayed')}>
        {t('spotifyBox.recentlyPlayed')}
      </button>
      <button className={`join-item capitalize text-base tracking-wide btn-ghost btn btn-sm rounded-none ${tab === 'mostPlayed' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('mostPlayed')}>
        {t('spotifyBox.mostPlayed')}
      </button>
      <button className={`join-item  capitalize text-base tracking-wide btn-ghost btn btn-sm  rounded-r-full  ${tab === 'queue' ? 'font-bold' : 'font-normal'}`} onClick={() => handleTabUpdate('queue')}>
        {t('spotifyBox.queue')}
      </button>
    </div>
  );
};

const TimeLeftIndicator = ({ dataRefreshTimer, startDataRefresh }: { dataRefreshTimer: React.MutableRefObject<number>; startDataRefresh: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(dataRefreshTimer.current - new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='flex items-center lg:tooltip' data-tip={`Automatic refresh in ${Math.round(timeLeft / 1000)} seconds`}>
      <button className='btn btn-ghost btn-xs rounded-full' onClick={startDataRefresh}>
        <IoMdRefresh size={20} />
      </button>
    </div>
  );
};

export default SpotifyTableHeader;
