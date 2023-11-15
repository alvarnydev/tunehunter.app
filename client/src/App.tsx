import Layout from './components/Layout';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ResultsPage from './components/TrackFinder/ResultsPage';
import SearchPage from './components/TrackFinder/SearchPage';
import { Toaster } from 'react-hot-toast';
import { NotFoundError } from './components/utils/ErrorComponents';
import CallbackPage from './components/TrackFinder/CallbackPage';
import { AuthProvider } from './contexts/auth';
import animationClasses from './utils/animations';
import { toastContainer, toastOptions } from './utils/toast';

const queryClient = new QueryClient();

const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <TransitionGroup component={null} exit={false}>
      <CSSTransition key={location.pathname} classNames={animationClasses} timeout={500}>
        <Routes location={location}>
          <Route path='/' element={<SearchPage />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='/callback' element={<CallbackPage />} />
          <Route path='*' element={<NotFoundError />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <Suspense fallback='...is loading'>
      {/* todo:
      https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions */}
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Toaster containerClassName='toaster-wrapper' position='top-center' reverseOrder={true} containerStyle={toastContainer} toastOptions={toastOptions} gutter={24} />
            <BrowserRouter>
              <AnimatedSwitch />
            </BrowserRouter>
          </Layout>
        </QueryClientProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
