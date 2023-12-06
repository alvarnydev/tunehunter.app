import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';
import { useAuth } from '../../../contexts/auth';
import { requestAuthorizationCodePKCE } from '../../../utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '../../../utils/localStorage';
import { FormDataType, SongTableTab } from '../../../../../types';
import { memo, useEffect, useRef, useState } from 'react';
import SpotifyTableLayout from './SpotifyIntegration/SpotifyTableLayout';
import SpotifyTableHeader from './SpotifyIntegration/SpotifyTableHeader';
import SpotifyTableBody from './SpotifyIntegration/SpotifyTableBody';

const SpotifyIntegration = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: FormDataType, final: boolean) => void }) => {
  const { t } = useTranslation();
  const { isAuthenticated, userData, refreshData } = useAuth();
  const [tab, setTab] = useState<SongTableTab>('recentlyPlayed');
  const tableHeight = useRef(208);
  const tableRef = useRef<HTMLDivElement>(null);

  const dataRefreshTimer = useRef(new Date().getTime() + 60_000);

  // Refresh data when song is finished or every 60 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    let timer: NodeJS.Timeout;

    const refreshDataOnEndOfSong = async () => {
      if (userData.currentlyPlaying == undefined) return;

      const songDuration = userData.currentlyPlaying.item.duration_ms;
      const songProgress = userData.currentlyPlaying.progress_ms;
      const timeLeft = songDuration - songProgress;

      dataRefreshTimer.current = new Date().getTime() + (timeLeft + 500);
      timer = setTimeout(() => {
        startDataRefresh();
      }, timeLeft + 500);
    };

    const refreshDataPeriodically = async (refreshTime: number) => {
      const newRefreshTimer = new Date().getTime() + refreshTime * 1000;
      if (newRefreshTimer < dataRefreshTimer.current) dataRefreshTimer.current = newRefreshTimer;
      timer = setTimeout(() => {
        startDataRefresh();
      }, refreshTime * 1000);
    };

    // Refresh data when song is finished
    if (userData.currentlyPlaying?.is_playing) {
      refreshDataOnEndOfSong();
    }
    refreshDataPeriodically(60);

    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, userData]);

  const startIntegration = () => {
    storeInLocalStorage('redirect_path', window.location.pathname + window.location.search);
    requestAuthorizationCodePKCE();
  };

  const startDataRefresh = () => {
    saveTableHeight();
    refreshData('currentlyAndRecently');
  };

  const saveTableHeight = () => {
    if (tableRef.current == null) return;
    tableHeight.current = tableRef.current.getBoundingClientRect().height;
  };

  const SpotifyTable = () => {
    const handleTabUpdate = (newTab: SongTableTab) => {
      saveTableHeight();
      setTab(newTab);
    };

    return (
      <SpotifyTableLayout loading={userData.recentlyPlayed === null}>
        <>
          <SpotifyTableHeader tab={tab} handleTabUpdate={handleTabUpdate} dataRefreshTimer={dataRefreshTimer} startDataRefresh={startDataRefresh} />
          <SpotifyTableBody tab={tab} handleFormUpdate={handleFormUpdate} tableRef={tableRef} tableHeight={tableHeight.current} />
        </>
      </SpotifyTableLayout>
    );
  };

  const IntegrationText = () => {
    return (
      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0'>
        <p className='pr-2'>{t('spotify.integration')}</p>
        <div className='flex items-center'>
          <button className='btn btn-info btn-xs rounded-full' onClick={startIntegration}>
            Spotify Integration
          </button>
          <InfoAnnotation infoText={t('spotify.annotation')} />
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {isAuthenticated && <SpotifyTable />}
      {!isAuthenticated && <IntegrationText />}
    </div>
  );
};

const MemoizedSpotifyIntegrationBox = memo(SpotifyIntegration);
export default MemoizedSpotifyIntegrationBox;
