import { ErrorBoundary } from 'react-error-boundary';
import AppAlert from '@/components/atoms/ErrorComponents';
import ResultsTable from '@/components/organisms/ResultsTable';
import SongPicker from '@/components/organisms/SongPicker';
import { PropsWithChildren } from 'react';

const ResultsPage = () => {
  const ResultsPageLayout = ({ children }: PropsWithChildren) => {
    return <div className='flex flex-col justify-center items-center w-full gap-14'>{children}</div>;
  };

  return (
    <ResultsPageLayout>
      <SongPicker />
      <ErrorBoundary fallback={<AppAlert type={'error'} />}>
        {/* onError={logError} */}
        <ResultsTable />
      </ErrorBoundary>
    </ResultsPageLayout>
  );
};

export default ResultsPage;
