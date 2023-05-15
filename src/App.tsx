import Layout from './components/Layout';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TrackFinder from './components/TrackFinder';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback='...is loading'>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <TrackFinder />
        </Layout>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
