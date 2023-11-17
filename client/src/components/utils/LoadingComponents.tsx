import { PulseLoader, ScaleLoader } from 'react-spinners';

export const LoadingSpinner = ({ size }: { size: number }) => {
  return <ScaleLoader height={size} width={size / 5} margin={size / 10} radius={size} color={'hsla(var(--bc))'} className='m-auto' />;
};

export const LoadingPulse = ({ size }: { size: number }) => {
  return <PulseLoader size={size} speedMultiplier={0.5} color={'hsla(var(--bc))'} />;
};

export const LoadingPage = () => {
  return (
    <div className='absolute right-0 top-0 flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner size={24} />
    </div>
  );
};
