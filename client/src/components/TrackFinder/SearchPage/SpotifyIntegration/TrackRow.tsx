const TrackRow: React.FC<{
  trackData: Track;
  currentlyPlaying?: boolean;
}> = (
  { trackData, currentlyPlaying } // todo: mark as playing
) => {
  const startSearch = () => {
    const newFormData = {
      country: userData.profileData?.country || 'DE',
      searchMode: 'song',
      songSearchQuery: {
        artist: trackData.artists[0].name,
        title: trackData.name,
        duration: trackData.duration_ms,
      },
      playlistSearchString: '',
    };

    handleFormUpdate(newFormData, true);
  };

  return (
    <tr className='[&>td]:border-0 relative [&>td]:rounded-none'>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar pr-2'>
            <div className={`mask mask-squircle w-10 h-10 `}>
              <img src={trackData.album.images[0].url} alt='Avatar Tailwind CSS Component' className='relative' />
            </div>
          </div>
          <div>
            <div>{trackData.artists[0].name}</div>
            <div className='text-sm opacity-50'>{trackData.artists[1]?.name}</div>
          </div>
        </div>
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {currentlyPlaying && <MusicPlayingIndicator size={12} />}
          <div className='inline'>{trackData.name.length >= 40 ? `${trackData.name.substring(0, 40)}...` : trackData.name}</div>
        </div>
      </td>
      <td className='absolute right-0 top-2'>
        <button className='btn btn-primary btn-outline btn-xs rounded-full' onClick={startSearch}>
          {t('searchbar.search')}
        </button>
      </td>
    </tr>
  );
};
