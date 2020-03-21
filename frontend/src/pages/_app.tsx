import './tailwind.scss';
import { Shell } from '../containers/Shell';
import { AuthProvider } from '../context/AuthContext';

import 'react-datepicker/dist/react-datepicker.css';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </AuthProvider>
  );
}
