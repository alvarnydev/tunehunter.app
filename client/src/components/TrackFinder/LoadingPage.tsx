import { CircleLoader } from 'react-spinners';

export const LoadingSpinner = (props: { size?: number }) => {
  return (
    <div role='status' className='flex items-center justify-center'>
      <CircleLoader size={props.size} color={`rgb(208, 214, 249)`} speedMultiplier={0.5} />
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className='absolute right-0 top-0 flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner size={120} />
    </div>
  );
};
