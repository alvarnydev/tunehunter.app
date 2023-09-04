import Layout from './components/Layout';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResultsTable from './components/TrackFinder/ResultsTable';
import SearchBar from './components/TrackFinder/SearchBar';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const toastContainer = {
  top: 30,
  left: 40,
  right: 40,
};
const toastOptions = {
  // bg-info rounded-full border-2 border-info
  className: 'alert alert-warning',
  style: {
    padding: '8px 0px',
  },
  error: {
    className: 'alert alert-error',
  },
};

function App() {
  return (
    <Suspense fallback='...is loading'>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Toaster
            containerClassName='toaster-wrapper'
            position='top-center'
            reverseOrder={true}
            containerStyle={toastContainer}
            toastOptions={toastOptions}
            gutter={24}
          />
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
