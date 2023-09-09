import Layout from './components/Layout';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResultsPage from './components/TrackFinder/ResultsPage';
import SearchPage from './components/TrackFinder/SearchPage';
import { Toaster } from 'react-hot-toast';
import BackButton from './components/TrackFinder/ResultsPage/BackButton';

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
              <Route path='/' element={<SearchPage />} />
              <Route path='/results' element={<ResultsPage />} />
              <Route
                path='*'
                element={
                  <>
                    <span>Nothing to see here.. 👀</span>
                    <BackButton />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
