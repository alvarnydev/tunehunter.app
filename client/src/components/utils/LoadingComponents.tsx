import { ScaleLoader } from 'react-spinners';

export const LoadingSpinner = ({ size }: { size: number }) => {
  return (
    <ScaleLoader
      height={size}
      width={size / 5}
      margin={size / 10}
      radius={size}
      color='#36d7b7'
      className='text-primary m-auto'
    />
  );
};

export const LoadingPage = () => {
  return (
    <div className='absolute right-0 top-0 flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner size={24} />
    </div>
  );
};
