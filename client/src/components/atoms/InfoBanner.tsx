const InfoBanner = ({ message, className }: { message: string; className?: string }) => {
  return (
    <div className={`${className}`}>
      <div className={`alert justify-center alert-info rounded-none flex-row items-center`}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-current shrink-0 w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <p className='!m-0'>{message}</p>
      </div>
    </div>
  );
};

export default InfoBanner;
