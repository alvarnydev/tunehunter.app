import Layout from './components/Layout';
import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ResultsPage from './components/TrackFinder/ResultsPage';
import SearchPage from './components/TrackFinder/SearchPage';
import { Toaster } from 'react-hot-toast';
import { NotFoundError } from './components/utils/ErrorComponents';
import CallbackPage from './components/TrackFinder/CallbackPage';
import { AuthProvider, useAuth } from './contexts/auth';
import animationClasses from './utils/animations';
import { toastContainer, toastOptions } from './utils/toast';
import { shouldRefreshToken, getNewTokens } from './utils/fetchSpotifyAuth';
import { retrieveFromLocalStorage } from './utils/localStorage';

const queryClient = new QueryClient();

const AnimatedSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const keyMappings = [
      { key: 'Backspace', action: () => navigate(-1) },
      { key: 'Escape', action: () => navigate('/') },
    ];

    const addKeyMappings = () => {
      keyMappings.forEach((keyMapping) => {
        document.addEventListener('keyup', (e) => {
          if (e.key == keyMapping.key && e.target == document.body) {
            keyMapping.action();
          }
        });
      });
    };

    const removeKeyMappings = () => {
      keyMappings.forEach((keyMapping) => {
        document.removeEventListener('keyup', (e) => {
          if (e.key == keyMapping.key && e.target == document.body) {
            keyMapping.action();
          }
        });
      });
    };

    const tryToIdentifyUser = async (): Promise<boolean> => {
      try {
        const accessToken = retrieveFromLocalStorage('access_token');
        const refreshToken = retrieveFromLocalStorage('refresh_token');
        login({ accessToken, refreshToken });
        return true;
      } catch (error) {
        return false;
      }
    };

    const refreshTokens = async () => {
      const tokens = await getNewTokens();
      login(tokens);
    };

    addKeyMappings();

    if (!isAuthenticated) tryToIdentifyUser();
    if (isAuthenticated && shouldRefreshToken()) refreshTokens();

    return () => {
      removeKeyMappings();
    };
  }, [isAuthenticated]); // navigate, login, isAuthenticated

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
