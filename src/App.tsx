import Layout from './components/Layout';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResultsTable from './components/TrackFinder/ResultsTable';
import SearchBar from './components/TrackFinder/SearchBar';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback='...is loading'>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<SearchBar />} />
              <Route path='/results' element={<ResultsTable />} />
              <Route path='*' element={<span>Nothing to see here 👀</span>} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
