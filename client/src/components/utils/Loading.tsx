import { ScaleLoader } from 'react-spinners';

export const LoadingSpinner = (props: { size: number }) => {
  return (
    <div className='h-[426px] flex'>
      <ScaleLoader
        height={props.size}
        width={props.size / 5}
        margin={props.size / 10}
        radius={props.size}
        color='#36d7b7'
        className='text-primary m-auto'
      />
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className='absolute right-0 top-0 flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner size={24} />
    </div>
  );
};
