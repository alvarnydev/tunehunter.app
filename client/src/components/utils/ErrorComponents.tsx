import { useTranslation } from 'react-i18next';
import BackButton from '../TrackFinder/ResultsPage/BackButton';

const ErrorAlert = ({ message }: { message?: string }) => {
  const { t } = useTranslation();

  return (
    <div className='alert alert-error w-4/5'>
      <div className='collapse collapse-arrow bg-error rounded-xl'>
        <input type='checkbox' />
        <div className='collapse-title flex gap-4'>
          <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <p>{t('errors.general')}</p>
        </div>
        <div className='collapse-content ml-10 flex flex-col gap-8'>
          <div className='flex justify-between items-center gap-4 border-t-2 pt-4'>
            <p className='w-1/3'>{t('errors.moreInformation')}</p>
            <div className='mockup-code w-2/3'>
              <pre data-prefix='~'>
                <code>{message}</code>
              </pre>
            </div>
          </div>
          <p>{t('errors.reachOut')}</p>
        </div>
      </div>
    </div>
  );
};

export const WarningAlert = (props: { message: string }) => {
  return (
    <div className='alert alert-warning w-auto'>
      <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
      </svg>
      <span>{props.message}</span>
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

export default ErrorAlert;
