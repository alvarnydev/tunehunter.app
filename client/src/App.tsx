import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Layout from '@/components/Layout';
import ResultsPage from '@/components/TrackFinder/ResultsPage';
import SearchPage from '@/components/TrackFinder/SearchPage';
import { NotFoundError } from '@/components/UtilComponents/ErrorComponents';
import CallbackPage from '@/components/TrackFinder/CallbackPage';
import { AuthProvider, useAuth } from '@/contexts/auth';
import animationClasses from '@/utils/animations';
import { toastContainer, toastOptions } from '@/utils/toast';
import { retrieveFromLocalStorage } from '@/utils/localStorage';
import { ThemeProvider, useTheme } from '@/contexts/theme';

const queryClient = new QueryClient();

const AnimatedSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const { changeTheme } = useTheme();

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
        retrieveFromLocalStorage('access_token');
        retrieveFromLocalStorage('refresh_token');
        await login();
        return true;
      } catch (error) {
        return false;
      }
    };

    const restoreTheme = () => {
      const themeStored = localStorage.getItem('theme');
      if (themeStored) {
        changeTheme(themeStored);
      }
    };

    addKeyMappings();
    restoreTheme();
    if (!isAuthenticated) tryToIdentifyUser();

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
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Toaster containerClassName='toaster-wrapper' position='top-center' reverseOrder={true} containerStyle={toastContainer} toastOptions={toastOptions} gutter={24} />
              <BrowserRouter>
                <AnimatedSwitch />
              </BrowserRouter>
            </Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
