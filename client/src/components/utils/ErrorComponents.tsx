import { useTranslation } from 'react-i18next';
import BackButton from '../TrackFinder/ResultsPage/BackButton';

const AppAlert = ({ type, message }: { type: string; message?: string }) => {
  const { t } = useTranslation();

  return (
    <div className={`alert w-auto max-w-[80%] alert-${type}`}>
      <div className='collapse collapse-arrow bg-error rounded-xl'>
        <input type='checkbox' />
        <div className='collapse-title flex gap-4'>
          {type === 'error' && (
            <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          )}
          {type === 'warning' && (
            <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          )}
          <p>{t('errors.general')}</p>
        </div>
        {message && (
          <div className='collapse-content ml-10 flex flex-col gap-6'>
            <div className='flex justify-between items-center gap-4 border-t-2 pt-4'>
              <p className='w-1/4'>{t('errors.moreInformation')}</p>
              <div className='mockup-code w-3/4'>
                <code className='block px-6 break-words'>{message}</code>
              </div>
            </div>
            <p>{t('errors.reachOut')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const UserAlert = ({ type, message }: { type: string; message: string }) => {
  return (
    <div className={`alert w-auto max-w-[80%] alert-${type}`}>
      <div className='rounded-xl'>
        <div className='flex gap-4'>
          {type === 'error' && (
            <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          )}
          {type === 'warning' && (
            <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          )}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export const WarningAlert = ({ message }: { message: string }) => {
  return (
    <div className='alert alert-warning w-auto'>
      <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export const NotFoundError = () => {
  return (
    <>
      <span>Nothing to see here.. 👀</span>
      <BackButton />
    </>
  );
};

export default AppAlert;
