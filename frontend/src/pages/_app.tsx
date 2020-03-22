import './tailwind.scss';
import { Shell } from '../containers/Shell';
import { AuthProvider } from '../context/AuthContext';

import 'react-datepicker/dist/react-datepicker.css';
import '@@/scss/react-tag-autocomplete/styles.scss';

import ReactGA from 'react-ga';
import { useEffect } from 'react';

const initGoogleAnalytics = () => {
  ReactGA.initialize('UA-106811947-6');
};

export default function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (!(window as any).__GA_INITIALIZED) {
      initGoogleAnalytics();
      (window as any).__GA_INITIALIZED = true;
    }

    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <AuthProvider>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </AuthProvider>
  );
}
