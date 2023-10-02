import Layout from './components/Layout';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ResultsPage from './components/TrackFinder/ResultsPage';
import SearchPage from './components/TrackFinder/SearchPage';
import { Toaster } from 'react-hot-toast';
import { NotFoundError } from './components/utils/ErrorComponents';

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

const animationClasses = {
  appear: 'opacity-0',
  enter: 'opacity-0',
  appearActive: 'transition-opacity duration-500 opacity-100',
  enterActive: 'transition-opacity duration-500 opacity-100',
};

const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <TransitionGroup component={null} exit={false}>
      <CSSTransition key={location.pathname} classNames={animationClasses} timeout={500}>
        <Routes location={location}>
          <Route path='/' element={<SearchPage />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='*' element={<NotFoundError />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
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
            <AnimatedSwitch />
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
