import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FormDataType, SongTableTab } from '@/types';
import InfoAnnotation from '@/components/UtilComponents/InfoComponents';
import { useAuth } from '@/contexts/auth';
import { requestAuthorizationCodePKCE } from '@/utils/fetchSpotifyAuth';
import { storeInLocalStorage } from '@/utils/localStorage';
import SpotifyTableLayout from './SpotifyIntegration/SpotifyTableLayout';
import SpotifyTableHeader from './SpotifyIntegration/SpotifyTableHeader';
import SpotifyTableBody from './SpotifyIntegration/SpotifyTableBody';

const SpotifyIntegration = ({ handleFormUpdate }: { handleFormUpdate: (newFormData: FormDataType, final: boolean) => void }) => {
  const { t } = useTranslation();
  const { isAuthenticated, userData, refreshData } = useAuth();
  const [tab, setTab] = useState<SongTableTab>('recentlyPlayed');
  const tableHeight = useRef(208);
  const tableScroll = useRef(0);
  const tableRef = useRef<HTMLDivElement>(null);
  const dataRefreshTimer = useRef(new Date().getTime() + 60_000);

  const startDataRefresh = useCallback(() => {
    saveTableInfo();
    refreshData();
  }, [refreshData]);

  const startIntegration = () => {
    storeInLocalStorage('redirect_path', window.location.pathname + window.location.search);
    requestAuthorizationCodePKCE();
  };

  const saveTableInfo = (scroll?: number) => {
    if (tableRef.current == null) return;
    tableHeight.current = tableRef.current.getBoundingClientRect().height;
    tableScroll.current = scroll === 0 ? scroll : tableRef.current.scrollTop;
  };

  // Refresh data when song is finished or every 60 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    let timer: NodeJS.Timeout;
    const refreshInterval = 60_000;
    let timeLeft;
    let isPlaying;
    if (userData.currentlyPlaying) {
      timeLeft = userData.currentlyPlaying.item.duration_ms - userData.currentlyPlaying.progress_ms;
      isPlaying = userData.currentlyPlaying.is_playing;
    }

    const refreshDataAfter = async (time: number) => {
      dataRefreshTimer.current = new Date().getTime() + (time + 500);
      timer = setTimeout(() => {
        startDataRefresh();
      }, time);
    };

    if (userData.recentlyPlayed === null) {
      startDataRefresh();
    } else if (isPlaying && timeLeft && timeLeft < refreshInterval) {
      refreshDataAfter(timeLeft);
    } else {
      refreshDataAfter(refreshInterval);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, userData, startDataRefresh]);

  const SpotifyTable = () => {
    const handleTabUpdate = (newTab: SongTableTab) => {
      saveTableInfo(0);
      setTab(newTab);
    };

    return (
      <SpotifyTableLayout loading={userData.recentlyPlayed === null}>
        <>
          <SpotifyTableHeader tab={tab} handleTabUpdate={handleTabUpdate} dataRefreshTimer={dataRefreshTimer} startDataRefresh={startDataRefresh} />
          <SpotifyTableBody tab={tab} handleFormUpdate={handleFormUpdate} tableRef={tableRef} tableHeight={tableHeight.current} tableScroll={tableScroll.current} />
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
