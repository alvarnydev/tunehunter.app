import { ScaleLoader, SyncLoader } from 'react-spinners';

export const LoadingIndicator = ({ size }: { size: number }) => {
  return <SyncLoader size={size / 3} margin={size / 10} color={'hsla(var(--bc))'} speedMultiplier={0.7} className='m-auto' />;
};

export const MusicPlayingIndicator = ({ size }: { size: number }) => {
  return <ScaleLoader height={size} width={size / 5} margin={size / 10} radius={size} speedMultiplier={0.8} color={'hsla(var(--in))'} />;
};

export const LoadingPage = () => {
  return (
    <div className='absolute right-0 top-0 flex h-screen w-screen items-center justify-center'>
      <LoadingIndicator size={24} />
    </div>
  );
};
