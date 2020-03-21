import './tailwind.scss';
import { Shell } from '../containers/Shell';
import { AuthProvider } from '../context/AuthContext';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </AuthProvider>
  );
}
